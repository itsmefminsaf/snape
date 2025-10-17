import { messageType, workspaceType } from "@/types/workspace";
import { useEffect, useRef, useState } from "react";
import LinkGithubAccountButton from "./LinkGithubAccountButton";
import { useUser } from "@auth0/nextjs-auth0";
import { GiMonoWheelRobot } from "react-icons/gi";
import MessageBlock from "./Message";
import WorkspaceNav from "./WorkspaceNav";
import PromptArea from "./PromptArea";
import {
  fetchConversation,
  getWorkspaceGithubToken,
} from "@/actions/getWorkspaces";

const Workspace = ({ workspaceData }: { workspaceData: workspaceType }) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [githubTokenExist, setGithubTokenExist] = useState(false);
  const [conversation, setConversation] = useState<messageType[]>([]);
  const [thinking, setThinking] = useState(false);
  const scrollToEndRef = useRef<HTMLSpanElement>(null);

  scrollToEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    (async () => {
      setLoading(true);
      setPrompt("");
      const githubConnectedToken = await getWorkspaceGithubToken(
        workspaceData._id,
      );
      setGithubTokenExist(githubConnectedToken);

      if (githubTokenExist) {
        setConversation(await fetchConversation(workspaceData._id));
      }

      setLoading(false);
    })();
  }, [workspaceData._id]);

  return (
    <section className="fixed size-full text-white">
      <WorkspaceNav
        workspaceName={workspaceData.workspaceName}
        roleTitle={workspaceData.roles[0].title}
        roleColor={workspaceData.roles[0].color}
      />

      <div className="flex h-[calc(100%-150px)] w-full flex-col items-center justify-center gap-2 p-3">
        {loading ? (
          <div className="animate-gradient to-neutral-0/30 size-full bg-gradient-to-b from-neutral-600/30 bg-[length:150%]"></div>
        ) : githubTokenExist ? (
          <>
            <div className="flex h-full w-[70rem] max-w-full flex-col gap-1 overflow-y-scroll p-3">
              {!loading && conversation.length === 0 ? (
                <div className="center gal-4 size-full flex-col">
                  <GiMonoWheelRobot size={50} className="animate-bounce" />
                  <p className="text-lg">Snape awaits for your command.</p>
                </div>
              ) : (
                conversation.map((message, index) => (
                  <MessageBlock message={message} key={index} />
                ))
              )}

              <span ref={scrollToEndRef} />

              {thinking && (
                <div className="center w-fit gap-1 border-2 border-neutral-800 bg-neutral-950/20 p-3 backdrop-blur-2xl">
                  <div
                    className="size-2 animate-bounce rounded-full bg-white"
                    style={{ animationDelay: `${1 * 500}ms` }}
                  ></div>
                  <div
                    className="size-2 animate-bounce rounded-full bg-white"
                    style={{ animationDelay: `${2 * 500}ms` }}
                  ></div>
                  <div
                    className="size-2 animate-bounce rounded-full bg-white"
                    style={{ animationDelay: `${3 * 500}ms` }}
                  ></div>
                </div>
              )}
            </div>
            <PromptArea
              conversation={conversation}
              email={user?.email ? user.email : "Unknown"}
              prompt={prompt}
              scrollToEndRef={scrollToEndRef}
              setConversation={setConversation}
              setPrompt={setPrompt}
              setThinking={setThinking}
              workspaceId={workspaceData._id}
            />
          </>
        ) : workspaceData.roles[0].permissions.includes("connect_github") ? (
          <LinkGithubAccountButton
            newWorkspaceId={workspaceData._id.toString()}
            githubTokenExist={githubTokenExist}
            setGithubTokenExist={setGithubTokenExist}
          />
        ) : (
          <p>
            You can&apos;t use the AI now. Please connect to github in order to
            use Snape
          </p>
        )}
      </div>
    </section>
  );
};

export default Workspace;
