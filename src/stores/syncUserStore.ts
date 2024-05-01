/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { useSession } from "next-auth/react";
import useUserStore from "@/stores/useUserStore";
import { useEffect } from "react";

// User state need to be synced with the session
export const syncUserStore = () => {
  const { data: session } = useSession();
  const { setUser, clearUser } = useUserStore();
  useEffect(() => {
    if (session?.user) {
      setUser({
        email: session?.user.id as string,
        name: session?.user.name as string,
        ...session?.user,
      });
    } else {
      clearUser();
    }
  }, [session, setUser, clearUser]);
};

