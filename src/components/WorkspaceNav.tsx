import { useAppState } from "@/context/appState";
import { IoMdArrowRoundBack } from "react-icons/io";

const WorkspaceNav = ({
  workspaceName,
  roleTitle,
  roleColor,
}: {
  workspaceName: string;
  roleTitle: string;
  roleColor: string;
}) => {
  const appState = useAppState();

  return (
    <div className="flex items-center justify-between p-2">
      <button
        className="center gap-2 border-b-2 border-b-transparent p-3 hover:border-white"
        onClick={() => appState?.setState.setOpenWorkspace(null)}
      >
        <IoMdArrowRoundBack size={25} />{" "}
        <span className="hidden sm:block">Back to Dashboard</span>
      </button>

      <div className="min-w-56 border-2 border-neutral-800 bg-neutral-950/50 px-4 py-2 text-right backdrop-blur-2xl">
        <h3 className="text-lg font-bold">{workspaceName}</h3>

        <div className="flex items-center justify-end gap-2 border-t-2 border-t-neutral-800 text-sm">
          {roleTitle}
          <div
            className="size-3 rounded-full"
            style={{ backgroundColor: roleColor }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceNav;
