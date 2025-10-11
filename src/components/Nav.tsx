"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import logo from "@/assets/snape.svg";
import { CgClose } from "react-icons/cg";

const Nav = ({ name, picture }: { name: string; picture: string }) => {
  const [showProfileDropDown, setShowProfileDropDown] = useState(false);

  return (
    <nav className="mx-auto mt-3 flex w-[98vw] items-center justify-between rounded-2xl bg-neutral-950 px-5 py-3 text-white shadow-2xl">
      <div className="flex items-center gap-5">
        <Image src={logo} alt="Snape AI" width={50} height={50} />
        <hr className="h-7 w-0.5 rotate-12 rounded-full bg-white" />
        <h1 className="text-2xl">Dashboard</h1>
      </div>

      <div className="relative">
        <Image
          src={picture}
          alt="user's profile"
          width={40}
          height={40}
          className="rounded-full"
          onClick={() => setShowProfileDropDown(true)}
        />
        {showProfileDropDown && (
          <div className="absolute top-16 right-0 min-w-52 space-y-2 rounded-xl bg-neutral-900 px-5 py-3 shadow-2xl">
            <button
              className="flex w-full items-center justify-between gap-3"
              onClick={() => setShowProfileDropDown(false)}
            >
              <p className="text-lg text-nowrap">{name}</p>
              <CgClose size={20} />
            </button>
            <hr />
            <ul>
              <li className="flex items-center gap-3 rounded-lg px-2 py-1 duration-300 hover:bg-neutral-800">
                <BiLogOut />
                <Link href="/auth/logout">Logout</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
