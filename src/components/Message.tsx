import { messageType } from "@/types/workspace";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import logo from "@/assets/snape.svg";
import dynamic from "next/dynamic";

const Markdown = dynamic(() => import("react-markdown"), { ssr: false });

const MessageBlock = ({ message }: { message: messageType }) => {
  return (
    <div className="grid w-fit grid-cols-[40px_auto] grid-rows-[10px_auto] gap-2 border-2 border-neutral-800 p-2">
      <abbr
        title={message.author}
        className="center row-span-2 size-10 rounded-2xl"
      >
        {message.author === "agent@snape.ai" ? (
          <Image src={logo} alt="snape" />
        ) : (
          <FaUser size={30} />
        )}
      </abbr>

      <p className="place-self-start text-sm font-bold text-neutral-500">
        {message.timestamp}
      </p>

      <div className="prose prose-invert">
        <Markdown >{message.text}</Markdown>
      </div>
    </div>
  );
};

export default MessageBlock;    
