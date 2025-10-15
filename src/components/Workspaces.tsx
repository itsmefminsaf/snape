import { sortedWorkspaceType } from "@/types/workspace";
import WorkspaceCard from "./WorkspaceCard";

const Workspaces = ({ workspaces }: { workspaces: sortedWorkspaceType[] }) => {
  return (
    <section className="p-4 text-white">
      <h3 className="m-5 mt-0 text-xl font-bold sm:text-2xl">
        Your workspaces
      </h3>
      <div className="flex justify-center sm:justify-start flex-wrap gap-5">
        {workspaces.map((workspace, index) => <WorkspaceCard key={index} workspace={workspace} />)}
      </div>
    </section>
  );
};

export default Workspaces;
