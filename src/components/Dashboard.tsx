import Nav from "./Nav";
import { User } from "@auth0/nextjs-auth0/types";
import AddWorkspaceForm from "./AddWorkspaceForm";
import UserMenu from "./UserMenu";
import Workspaces from "./Workspaces";
import { getWorkspaceList } from "@/actions/getWorkspaces";

const Dashboard = async ({ user }: { user: User }) => {
  const workspaces = await getWorkspaceList(user.email || "");
  return (
    <>
      <Nav picture={user.picture || ""} />
      <UserMenu name={user.name || "Unknown"} />
      <AddWorkspaceForm email={user.email || ""} />
      <Workspaces workspaces={workspaces} />
    </>
  );
};

export default Dashboard;
