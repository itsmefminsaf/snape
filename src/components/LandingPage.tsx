import Link from "next/link";

const LandingPage = () => {
  return (
    <>
      <h1>Welcome to Snape</h1> <Link href="/auth/login">Login</Link>
    </>
  );
};

export default LandingPage;
