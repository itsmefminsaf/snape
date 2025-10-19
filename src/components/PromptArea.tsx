import handlePrompt from "@/actions/handlePrompt";
import { messageType } from "@/types/workspace";
import { BiSend } from "react-icons/bi";

const PromptArea = ({
  workspaceId,
  scrollToEndRef,
  prompt,
  thinking,
  setPrompt,
  setThinking,
  setConversation,
  conversation,
  email,
}: {
  prompt: string;
  thinking: boolean;
  workspaceId: string;
  scrollToEndRef: React.RefObject<HTMLSpanElement | null>;
  conversation: messageType[];
  email: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  setThinking: React.Dispatch<React.SetStateAction<boolean>>;
  setConversation: React.Dispatch<React.SetStateAction<messageType[]>>;
}) => {
  const askAI = async () => {
    if(!prompt.trim()) return

    setPrompt("");

    const timestamp = new Date().toUTCString();

    setConversation([
      ...conversation,
      {
        author: email,
        text: prompt,
        timestamp,
      },
    ]);

    setThinking(true);

    const newConversation = await handlePrompt(
      workspaceId,
      prompt,
      email,
      timestamp,
      conversation,
    );

    if (newConversation) {
      setConversation([
        ...conversation,
        {
          author: email,
          text: prompt,
          timestamp,
        },
        newConversation,
      ]);
    }
    
    setThinking(false);
    scrollToEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === "Enter") askAI();
  };

  return (
    <div className="flex w-full items-end justify-between gap-2 border-2 border-neutral-800 px-2 duration-300 focus-within:border-neutral-500 md:w-3/5 md:focus-within:w-4/5">
      <textarea
        disabled={thinking}
        value={prompt}
        onChange={(e) => {
          setPrompt(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        rows={prompt.split("\n").length}
        placeholder="Say something to Snape..."
        className="w-full resize-none px-3 py-2 text-xl outline-none disabled:opacity-50"
      />
      <button disabled={thinking} className="p-2 disabled:opacity-50" onClick={() => askAI()}>
        <BiSend size={25} />
      </button>
    </div>
  );
};

export default PromptArea;
