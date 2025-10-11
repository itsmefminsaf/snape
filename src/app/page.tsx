import LandingPage from "@/components/LandingPage";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const session = await auth.getSession();

  if (session?.user) return redirect("/dashboard");

  return <LandingPage />;
};

export default HomePage;
