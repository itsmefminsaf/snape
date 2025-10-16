import { useAppState } from "@/context/appState";
import { workspaceType } from "@/types/workspace";

const WorkspaceCard = ({ workspace }: { workspace: workspaceType }) => {
  const appState = useAppState();
  
  return (
    <button
      onClick={() => appState?.setState.setOpenWorkspace(workspace)}
      className="w-72 h-fit border-2 border-neutral-800 bg-neutral-950/50"
    >
      <h5 className="border-b-2 border-neutral-800 px-5 py-3 text-left">
        {workspace.workspaceName}
      </h5>

      <div className="flex items-center justify-end gap-2 p-3">
        {workspace.roles[0].title}
        <div
          className="size-5 rounded-full"
          style={{ backgroundColor: workspace.roles[0].color }}
        ></div>
      </div>
    </button>
  );
};

export default WorkspaceCard;
