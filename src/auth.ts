import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import cookie from "cookie";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const authResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/login`,
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

        // authResponse.ok is still ok even when status is 401, so handling that
        if (!authResponse.ok || authResponse.status === 401) {
          return null;
        }
        
        const user = await authResponse.json();

        return {
          id: user.email,
          name: user.nickname,
          ...user,
        }
      },
    }),
  ],
});
