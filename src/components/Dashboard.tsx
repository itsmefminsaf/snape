"use client";

import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import logo from "@/assets/snape.svg";
import { useState } from "react";
import Link from "next/link";
import { BiLogOut, BiSend } from "react-icons/bi";
import openai from "@/lib/huggingFace";

const Dashboard = () => {
  const { user, isLoading } = useUser();
  const [showProfileDropDown, setShowProfileDropDown] = useState(false);
  const [AIResponse, setAIResponse] = useState("");
  const [prompt, setPrompt] = useState("");

  const askAI = async () => {
    const message = await openai(prompt);
    message.content && setAIResponse(message.content?.toString());
  };

  return (
    <>
      <nav className="flex w-screen items-center justify-between bg-neutral-950 px-5 py-3 text-white shadow-2xl">
        <div className="flex items-center gap-5">
          <Image src={logo} alt="Snape AI" width={50} height={50} />
          <hr className="h-7 w-0.5 rotate-12 rounded-full bg-white" />
          <h1 className="text-2xl">Dashboard</h1>
        </div>
        <div className="relative">
          {isLoading ? (
            <div className="animate-loading aspect-square w-12 rounded-full bg-gradient-to-bl from-neutral-700 to-neutral-500"></div>
          ) : (
            <>
              {user?.picture && (
                <Image
                  src={user.picture}
                  alt={`${user.name}'s profile`}
                  width={40}
                  height={40}
                  className="rounded-full"
                  onClick={() => {
                    setShowProfileDropDown(!showProfileDropDown);
                  }}
                />
              )}
              {showProfileDropDown && (
                <ul className="absolute top-14 right-0 space-y-2 rounded-2xl bg-neutral-900 px-7 py-3">
                  <li className="text-2xl text-nowrap">{user?.name}</li>
                  <hr />
                  <li className="flex gap-3">
                    <BiLogOut />
                    <Link href="/auth/logout">Logout</Link>
                  </li>
                </ul>
              )}
            </>
          )}
        </div>
      </nav>

      <div>
        <p>{AIResponse}</p>
        <input
          type="text"
          placeholder="Ask Snape..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={askAI}>
          <BiSend />
        </button>
      </div>
    </>
  );
};

export default Dashboard;
