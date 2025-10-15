import { useAppState } from "@/context/appState";
import { sortedWorkspaceType } from "@/types/workspace";

const WorkspaceCard = ({ workspace }: { workspace: sortedWorkspaceType }) => {
  const appState = useAppState();

  return (
    <button
      onClick={() => appState?.setState.setOpenWorkspace(workspace._id)}
      className="w-72 border-2 border-neutral-800 bg-neutral-950/50"
    >
      <h5 className="border-b-2 border-neutral-800 px-5 py-3 text-left">
        {workspace.workspaceName}
      </h5>

      <div className="flex items-center justify-end gap-2 p-3">
        {workspace.role.title}
        <div
          className="size-5 rounded-full"
          style={{ backgroundColor: workspace.role.color }}
        ></div>
      </div>
    </button>
  );
};

export default WorkspaceCard;
