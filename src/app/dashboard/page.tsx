import Dashboard from "@/components/Dashboard";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth.getSession();

  if (!session) return redirect("/auth/login");

  return <Dashboard />;
};

export default DashboardPage;
