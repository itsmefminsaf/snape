import getWorkspaces from "@/actions/getWorkspaces";
import Nav from "./Nav";
import { User } from "@auth0/nextjs-auth0/types";
import AddWorkspaceForm from "./AddWorkspaceForm";
import UserMenu from "./UserMenu";

const Dashboard = async ({ user }: { user: User }) => {
  const workspaces = await getWorkspaces(user.email || "");
  console.log(workspaces);
  return (
    <>
      <Nav picture={user.picture || ""} />
      <UserMenu name={user.name || "Unknown"} />
      <AddWorkspaceForm />
    </>
  );
};

export default Dashboard;
