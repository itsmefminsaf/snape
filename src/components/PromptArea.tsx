import handlePrompt from "@/actions/handlePrompt";
import { messageType } from "@/types/workspace";
import { BiSend } from "react-icons/bi";

const PromptArea = ({
  workspaceId,
  scrollToEndRef,
  prompt,
  setPrompt,
  setThinking,
  setConversation,
  conversation,
  email,
}: {
  prompt: string;
  workspaceId: string;
  scrollToEndRef: React.RefObject<HTMLSpanElement | null>;
  conversation: messageType[];
  email: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  setThinking: React.Dispatch<React.SetStateAction<boolean>>;
  setConversation: React.Dispatch<React.SetStateAction<messageType[]>>;
}) => {
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === "Enter") {
      setPrompt("");
      setThinking(true);

      const timestamp = new Date().toUTCString();

      setConversation([
        ...conversation,
        {
          author: email,
          text: prompt,
          timestamp,
        },
      ]);

      const newConversation = await handlePrompt(
        workspaceId,
        prompt,
        email,
        timestamp,
        conversation,
      );

      if (newConversation) {
        setConversation([...conversation, newConversation]);
      }
      setThinking(false);
      scrollToEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
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
  );
};

export default PromptArea;
