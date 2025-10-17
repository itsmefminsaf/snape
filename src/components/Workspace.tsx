import { useAppState } from "@/context/appState";
import { messageType, workspaceType } from "@/types/workspace";
import MarkDown from "react-markdown";
import { useEffect, useRef, useState } from "react";
import { BiSend } from "react-icons/bi";
import { IoMdArrowRoundBack } from "react-icons/io";
import LinkGithubAccountButton from "./LinkGithubAccountButton";
import {
  fetchConversation,
  getWorkspaceGithubToken,
} from "@/actions/getWorkspaces";
import handlePrompt from "@/actions/handlePrompt";
import { useUser } from "@auth0/nextjs-auth0";
import { GiMonoWheelRobot } from "react-icons/gi";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import logo from "@/assets/snape.svg";
import Image from "next/image";
import { FaUser } from "react-icons/fa";

const Workspace = ({ workspaceData }: { workspaceData: workspaceType }) => {
  const { user } = useUser();
  const appState = useAppState();
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
  }, [githubTokenExist, workspaceData._id]);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === "Enter") {
      setPrompt("");
      setThinking(true);

      const timestamp = new Date().toUTCString();

      setConversation([
        ...conversation,
        {
          author: user?.email ? user.email : "unknown",
          text: prompt,
          timestamp,
        },
      ]);

      const newConversation = await handlePrompt(
        workspaceData._id,
        prompt,
        user?.email ? user.email : "unknown",
        timestamp,
        conversation,
      );

      newConversation && setConversation([...conversation, newConversation]);
      setThinking(false);
      scrollToEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

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
                conversation.map((message, index) => {
                  return (
                    <div
                      key={index}
                      className="grid w-fit grid-cols-[40px_auto] grid-rows-[10px_auto] gap-2 border-2 border-neutral-800 p-2"
                    >
                      <abbr
                        title={message.author}
                        className="row-span-2 size-10 rounded-2xl center"
                      >
                        {message.author === "agent@snape.ai" ? (
                          <Image src={logo} alt="snape" />
                        ) : (
                          <FaUser size={30}/>
                        )}
                      </abbr>

                      <p className="place-self-start text-sm font-bold text-neutral-500">
                        {message.timestamp}
                      </p>

                      <div className="prose prose-invert">
                        <MarkDown
                          rehypePlugins={[rehypeRaw]}
                          remarkPlugins={[remarkGfm]}
                        >
                          {message.text}
                        </MarkDown>
                      </div>
                    </div>
                  );
                })
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
            <div className="flex w-full items-end justify-between gap-2 border-2 border-neutral-800 px-2 duration-300 focus-within:border-neutral-500 md:w-3/5 md:focus-within:w-4/5">
              <textarea
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                rows={prompt.split("\n").length}
                placeholder="Say something to Snape..."
                className="w-full resize-none px-3 py-2 text-xl outline-none"
              />
              <button className="p-2">
                <BiSend size={25} />
              </button>
            </div>
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
