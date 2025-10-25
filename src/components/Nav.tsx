"use client";

import Image from "next/image";
import logo from "@/assets/snape.svg";
import { IoIosArrowDown } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { BiLogOut, BiMenu, BiUser } from "react-icons/bi";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";

const Nav = ({ name, picture }: { name: string; picture: string }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileDropDown, setShowProfileDropDown] = useState(false);

  return (
    <nav className="grid h-16 grid-cols-[auto_1fr_auto] border-b-2 border-b-neutral-800 bg-neutral-950/50 text-white backdrop-blur-2xl sm:h-20 lg:grid-cols-[auto_1fr_auto_auto]">
      <div className="center w-fit gap-3 border-r-2 border-r-neutral-800 px-5">
        <button className="lg:hidden" onClick={() => setShowMenu(!showMenu)}>
          {showMenu ? <CgClose /> : <BiMenu size={20} />}
        </button>
        <Image
          className="size-7 sm:size-12"
          src={logo}
          alt="Snape AI"
          width={50}
          height={50}
        />
        <hr className="hidden h-7 w-0.5 rotate-12 bg-white sm:block" />
        <h1 className="hidden text-2xl font-bold sm:block">Dashboard</h1>
      </div>

      <ul
        className={`${showMenu ? "flex" : "hidden"} absolute top-[100%] flex-col gap-3 bg-neutral-950/50 px-5 backdrop-blur-2xl max-lg:justify-center max-lg:py-5 lg:static lg:flex lg:flex-row lg:items-center lg:bg-transparent lg:backdrop-blur-none`}
      >
        <li>
          Made with ❤️ by{" "}
          <Link
            className="text-cyan-500 underline"
            href="https://github.com/itsmefminsaf"
            target="_blank"
          >
            itsmefminsaf
          </Link>
        </li>
        <hr className="h-0.5 w-full bg-white lg:h-7 lg:w-0.5" />
        <li>
          <Link
            className="center w-fit gap-2 hover:underline"
            href="https://github.com/itsmefminsaf/snape"
            target="_blank"
          >
            <BsGithub /> Contribute
          </Link>
        </li>
      </ul>

      <Link
        className="center gap-1 justify-self-end px-3 text-sm text-nowrap hover:bg-neutral-950/50 hover:backdrop-blur-2xl sm:px-5 sm:text-lg lg:border-l-2 lg:border-l-neutral-800"
        href="/dashboard/workspace/new"
      >
        <IoAdd size={23} />
        New Workspace
      </Link>

      <div
        className="center w-fit gap-1 border-l-2 border-l-neutral-800 px-3 sm:gap-3 sm:px-5"
        onClick={() => setShowProfileDropDown(true)}
      >
        {picture ? (
          <Image
            className="size-6 sm:size-10"
            src={picture}
            alt="user's profile"
            width={40}
            height={40}
          />
        ) : (
          <BiUser />
        )}
        <IoIosArrowDown />
      </div>
      {showProfileDropDown && (
        <div className="absolute top-full right-0 z-50 min-w-52 space-y-2 border-2 border-neutral-800 bg-neutral-950/50 px-5 py-3 text-white backdrop-blur-2xl">
          <button
            className="flex w-full items-center justify-between gap-3"
            onClick={() => setShowProfileDropDown(false)}
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
      )}
    </nav>
  );
};

export default Nav;
