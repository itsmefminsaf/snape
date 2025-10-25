import Chat from "@/components/Chat";
import Nav from "@/components/Nav";
import auth0 from "@/lib/auth";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth0.getSession();

  if (!session) return redirect("/auth/login");

  return (
    <>
      <Nav />
      <Chat email={session.user.email!} />
    </>
  );
};

export default DashboardPage;
