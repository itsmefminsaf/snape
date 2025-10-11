import getWorkspaces from "@/actions/getWorkspaces";
import Nav from "./Nav";
import { User } from "@auth0/nextjs-auth0/types";

const Dashboard = async ({ user }: { user: User }) => {
  const workspaces = await getWorkspaces(user.email || "");
  console.log(workspaces);
  return (
    <>
      <Nav name={user.name || "Unknown"} picture={user.picture || ""} />
    </>
  );
};

export default Dashboard;
