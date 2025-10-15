"use client";

import { sortedWorkspaceType } from "@/types/workspace";
import WorkspaceCard from "./WorkspaceCard";
import { useAppState } from "@/context/appState";
import Workspace from "./Workspace";

const Workspaces = ({ workspaces }: { workspaces: sortedWorkspaceType[] }) => {
  const appState = useAppState();

  if (appState?.state.openWorkspace)
    return <Workspace _id={appState.state.openWorkspace} />;

  return (
    <section className="p-4 text-white">
      <h3 className="m-5 mt-0 text-xl font-bold sm:text-2xl">
        Your workspaces
      </h3>
      <div className="flex flex-wrap justify-center gap-5 sm:justify-start">
        {workspaces.map((workspace, index) => (
          <WorkspaceCard key={index} workspace={workspace} />
        ))}
      </div>
    </section>
  );
};

export default Workspaces;
