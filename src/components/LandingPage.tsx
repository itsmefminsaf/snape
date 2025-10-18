import Link from "next/link";
import { BiArrowToRight } from "react-icons/bi";

const LandingPage = () => {
  return (
    <main className="center h-screen w-screen flex-col gap-3 text-white">
      <h1 className="text-xl font-bold">Welcome to Snape</h1>
      <h2 className="text-lg text-neutral-400">
        - Great power comes with, great responsibly -
      </h2>
      <Link
        href="/auth/login"
        className="center gap-2 hover:scale-105 active:scale-95 duration-300 bg-white px-3 py-2 text-2xl font-extrabold text-neutral-950"
      >
        <BiArrowToRight />
        Start using for free
      </Link>
    </main>
  );
};

export default LandingPage;
