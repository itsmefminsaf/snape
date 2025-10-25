import Image from "next/image";
import { FaUser } from "react-icons/fa";
import logo from "@/assets/snape.svg";
import dynamic from "next/dynamic";
import remarkGfm from "remark-gfm";
import { messageType } from "../../types/message";
import { useRef } from "react";

const Markdown = dynamic(() => import("react-markdown"), { ssr: false });

const MessageBubble = ({ message }: { message: messageType }) => {
  const ref = useRef<HTMLDivElement>(null);
  ref.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div
      className={`${message.author === "user" && "ml-auto bg-white text-neutral-950"} mb-3 grid w-fit grid-cols-[40px_auto] grid-rows-[10px_auto] gap-2 gap-y-2 border-2 border-neutral-800 p-2`}
    >
      {message.author === "assistant" ? (
        <Image
          className="row-span-2 mt-2 justify-self-center"
          src={logo}
          alt="snape"
          width={35}
          height={35}
        />
      ) : (
        <FaUser className="row-span-2 mt-1 justify-self-center" size={35} />
      )}

      <p className="place-self-start text-sm font-bold text-neutral-500">
        {message.timestamp}
      </p>

      {message.author === "assistant" ? (
        <div className="prose prose-invert" ref={ref}>
          <Markdown remarkPlugins={[remarkGfm]}>{message.text}</Markdown>
        </div>
      ) : (
        message.text
      )}
    </div>
  );
};

export default MessageBubble;
