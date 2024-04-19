"use client";

import Link from "next/link";
import Avatar from "./Avatar";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useUserStore from "@/stores/useUserStore";
import { syncUserStore } from "@/stores/syncUserStore";

export default function Header() {
  const router = useRouter();
  const { status } = useSession();
  syncUserStore(); // Syncing user status with the session
  const { user, clearUser } = useUserStore();
  const onLogOut = () => {
    signOut({ redirect: false }).then(() => {
      clearUser();
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/logout`, {
        method: "post",
        credentials: "include",
      });
      router.refresh();
      router.replace("/");
    });
  };

  let authContent;
  if (status === "loading") {
    authContent = (
      <span className="loading loading-spinner text-primary"></span>
    );
  } else if (user !== null) {
    authContent = (
      <Avatar nickname={user?.name as string} onLogOut={onLogOut} />
    );
  } else {
    authContent = (
      <Link href="/login" passHref>
        <button className="btn btn-primary">Log In</button>
      </Link>
    );
  }

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href={"/"}>
          <ul>
            <li>
              <span className="text-[#0077C0]">Engage</span>.pub
            </li>
          </ul>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={"/talk"}>My Pub</Link>
          </li>
          <li>
            <Link href={"/create"}>Create</Link>
          </li>
        </ul>
        {authContent}
      </div>
    </div>
  );
}
