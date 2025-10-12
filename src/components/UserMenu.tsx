"use client";

import { useAppState } from "@/context/appState";
import Link from "next/link";
import { BiLogOut } from "react-icons/bi";
import { CgClose } from "react-icons/cg";

const UserMenu = ({ name }: { name: string }) => {
  const appState = useAppState();
  return (
    appState?.state.showProfileDropDown && (
      <div className="fixed right-0 z-50 min-w-52 space-y-2 border-2 border-t-0 border-neutral-800 bg-neutral-950/50 px-5 py-3 text-white backdrop-blur-2xl">
        <button
          className="flex w-full items-center justify-between gap-3"
          onClick={() => appState?.setState.setShowProfileDropDown(false)}
        >
          <p className="text-lg text-nowrap">{name}</p>
          <CgClose size={20} />
        </button>
        <hr />
        <ul>
          <li className="flex items-center gap-3 px-2 py-1 duration-300 hover:bg-neutral-800/50">
            <BiLogOut />
            <Link href="/auth/logout">Logout</Link>
          </li>
        </ul>
      </div>
    )
  );
};

export default UserMenu;
