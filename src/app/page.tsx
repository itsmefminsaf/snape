import Dashboard from "@/components/Dashboard";
import LandingPage from "@/components/LandingPage";
import AppStateProvider from "@/context/appState";
import { auth } from "@/lib/auth";

const HomePage = async () => {
  const session = await auth.getSession();

  if (session?.user)
    return (
      <AppStateProvider>
        <Dashboard user={session.user} />
      </AppStateProvider>
    );

  return <LandingPage />;
};

export default HomePage;
