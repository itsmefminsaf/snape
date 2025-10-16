"use client";

import WorkspaceCard from "./WorkspaceCard";
import { useAppState } from "@/context/appState";
import Workspace from "./Workspace";
import { workspaceType } from "@/types/workspace";

const Workspaces = ({ workspaces }: { workspaces: workspaceType[] }) => {
  const appState = useAppState();

  if (appState?.state.openWorkspace)
    return <Workspace workspaceData={appState.state.openWorkspace} />;

  return (
    <section className="fixed p-4 size-full text-white">
      <h3 className="m-5 mt-0 text-xl font-bold sm:text-2xl">
        Your workspaces
      </h3>
      
      <div className="flex flex-wrap justify-center gap-5 sm:justify-start">
        {workspaces.length === 0 ? (
          <div className="center size-full">
            <h1 className="text-xl text-neutral-400">
              Your have no workspaces. Create one.
            </h1>
          </div>
        ) : (
          workspaces.map((workspace, index) => (
            <WorkspaceCard key={index} workspace={workspace} />
          ))
        )}
      </div>
    </section>
  );
};

export default Workspaces;
