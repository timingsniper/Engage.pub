"use client";

import Link from "next/link";
import Avatar from "./Avatar";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const { data: me, status } = useSession();
  console.log(me);
  const onLogOut = () => {
    signOut({ redirect: false }).then(() => {
      router.replace("/");
    });
  };

  let authContent;
  if (status === "loading") {
    authContent = <span className="loading loading-spinner text-primary"></span>;
  } else if (me) {
    authContent = <Avatar nickname={me?.user?.name as string} onLogOut={onLogOut} />;
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
            <Link href={"/talk"}>Talk</Link>
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
