"use client";

import Image from "next/image";
import Link from "next/link";
import { BiLogOut } from "react-icons/bi";
import logo from "@/assets/snape.svg";
import { CgClose } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { useAppState } from "@/context/appState";

const Nav = ({ name, picture }: { name: string; picture: string }) => {
  const appState = useAppState();

  return (
    <nav className="flex items-center justify-between border-b-2 border-b-neutral-800 bg-neutral-950/50 text-white backdrop-blur-2xl">
      <div className="flex items-center gap-5 border-r-2 border-r-neutral-800 p-5">
        <Image src={logo} alt="Snape AI" width={50} height={50} />
        <hr className="h-7 w-0.5 rotate-12 rounded-full bg-white" />
        <h1 className="text-2xl">Dashboard</h1>
      </div>

      <div className="border-x-2 border-x-neutral-800 p-8">
        <button
          onClick={() => {
            appState?.setState.setShowAddWorkSpaceForm(true);
          }}
          className="flex h-full w-full items-center justify-center gap-3"
        >
          <IoAdd size={23} />
          New Workspace
        </button>
      </div>

      <div className="relative border-l-2 border-l-neutral-800 p-6">
        <div
          onClick={() => appState?.setState.setShowProfileDropDown(true)}
          className="flex items-center justify-center gap-3"
        >
          <Image
            src={picture}
            alt="user's profile"
            width={40}
            height={40}
            className="rounded-full"
          />
          <IoIosArrowDown />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
