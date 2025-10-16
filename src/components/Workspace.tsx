import { getWorkspaceGHToken } from "@/actions/getWorkspaces";
import { useAppState } from "@/context/appState";
import { workspaceType } from "@/types/workspace";
import { useEffect, useState } from "react";
import { BiSend } from "react-icons/bi";
import { BsGithub } from "react-icons/bs";
import { IoMdArrowRoundBack } from "react-icons/io";

const Workspace = ({ workspaceData }: { workspaceData: workspaceType }) => {
  const appState = useAppState();
  const [loading, setLoading] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [githubToken, setGithubToken] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setGithubToken(await getWorkspaceGHToken(workspaceData._id));
      setLoading(false);
    })();
  }, []);

  return (
    <section className="fixed size-full text-white">
      <div className="flex items-center justify-between p-2">
        <button
          className="center gap-2 border-b-2 border-b-transparent p-3 hover:border-white"
          onClick={() => appState?.setState.setOpenWorkspace(null)}
        >
          <IoMdArrowRoundBack size={25} />{" "}
          <span className="hidden sm:block">Back to Dashboard</span>
        </button>

        <div className="min-w-56 border-2 border-neutral-800 bg-neutral-950/50 px-4 py-2 text-right backdrop-blur-2xl">
          <h3 className="text-lg font-bold">{workspaceData.workspaceName}</h3>

          <div className="flex items-center justify-end gap-2 border-t-2 border-t-neutral-800 text-sm">
            {workspaceData.roles[0].title}
            <div
              className="size-3 rounded-full"
              style={{ backgroundColor: workspaceData.roles[0].color }}
            ></div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100%-150px)] w-full flex-col justify-center items-center gap-2 p-3">
        {loading ? (
          <div className="animate-gradient to-neutral-0/30 size-full bg-gradient-to-b from-neutral-600/30 bg-[length:150%]"></div>
        ) : githubToken ? (
          <>
            <div className="w-full h-full bg-neutral-950/30 p-3 backdrop-blur-2xl"></div>
            <div className="flex w-full items-end justify-between gap-2 border-2 border-neutral-800 px-2 duration-300 focus-within:border-neutral-500 md:w-3/5 md:focus-within:w-4/5">
              <textarea
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                }}
                rows={prompt.split("\n").length}
                placeholder="Say something to Snape..."
                className="resize-none w-full px-3 py-2 text-xl outline-none"
              />
              <button className="p-2">
                <BiSend size={25} />
              </button>
            </div>
          </>
        ) : workspaceData.roles[0].permissions.includes("connect_github") ? (
          <button className="center flex-col gap-2">
            <BsGithub size={25} />
            <span className="text-2xl">Connect Github</span>
          </button>
        ) : <p>You can't use the AI now. Please connect to github in order to use Snape</p>}
      </div>
    </section>
  );
};

export default Workspace;
