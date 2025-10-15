import getWorkspaceData from "@/actions/getWorkspaceData";
import { useAppState } from "@/context/appState";
import { workspaceType } from "@/types/workspace";
import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

const Workspace = ({ _id }: { _id: string }) => {
  const appState = useAppState();
  const [workspaceData, setWorkspaceData] = useState<workspaceType>();

  useEffect(() => {
    (async () => {
      setWorkspaceData(JSON.parse(await getWorkspaceData(_id)));
      console.log(workspaceData);
    })();
  }, []);

  return (
    <section className="p-3 text-white">
      <div>
        <button
          className="center gap-2 border-b-2 border-b-transparent p-3 hover:border-white"
          onClick={() => appState?.setState.setOpenWorkspace("")}
        >
          <IoMdArrowRoundBack size={25} /> Back to Dashboard
        </button>
        <div>
          <h3>{workspaceData?.workspaceName}</h3>
        </div>
      </div>
    </section>
  );
};

export default Workspace;
