import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import cookie from "cookie";
import useUserStore from "./stores/useUserStore";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  trustHost: true,
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const authResponse = await fetch(
          `${process.env.NEXT_PUBLIC_LOCALAUTH_URL}/user/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.username,
              password: credentials.password,
            }),
          }
        );

        // Setting cookies sent from the backend
        let setCookie = authResponse.headers.get("Set-Cookie");
        if (setCookie) {
          const parsed = cookie.parse(setCookie);
          cookies().set("connect.sid", parsed["connect.sid"], {
            domain: parsed.Domain,
            secure: process.env.APP_ENV === "production",
          });
        }

        // authResponse.ok is still ok even when status is 401, so handling that
        if (!authResponse.ok || authResponse.status === 401) {
          return null;
        }

        const user = await authResponse.json();
        useUserStore.getState().setUser({
          email: user.email,
          name: user.nickname,
          ...user,
        });

        return {
          id: user.email,
          name: user.nickname,
          ...user,
        };
      },
    }),
  ],
});
