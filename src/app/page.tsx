import Dashboard from "@/components/Dashboard";
import LandingPage from "@/components/LandingPage";
import { auth } from "@/lib/auth";

const HomePage = async () => {
  const session = await auth.getSession();

  if (session?.user) return <Dashboard user={session.user} />;

  return <LandingPage />;
};

export default HomePage;
