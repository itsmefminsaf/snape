"use client";

import { KeyboardEvent, useEffect, useState } from "react";
import { messageType } from "../../types/message";
import fetchConversation from "@/actions/fetchConversation";
import MessageBubble from "./MessageBubble";
import Thinking from "./Thinking";
import handlePrompt from "@/actions/handlePrompt";
import ConversationErrorMessage from "./ConversationErrorMessage";
import { BiSend } from "react-icons/bi";
import ConversationLoading from "./ConversationLoading";
import PromptSuggest from "./PromptSuggest";

const Chat = ({ email }: { email: string }) => {
  const [loading, setLoading] = useState(true);
  const [thinking, setThinking] = useState(false);
  const [conversationError, setConversationError] = useState(false);
  const [conversation, setConversation] = useState<messageType[] | null>(null);
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    (async () => {
      const fetchedConversation = await fetchConversation(email);

      setConversation(fetchedConversation.reverse());

      setLoading(false);
    })();
  }, []);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    const timestamp = new Date().toUTCString();

    const userMessage: messageType = {
      author: "user",
      text: prompt,
      timestamp,
    };

    setConversation([userMessage, ...conversation!]);
    setPrompt("");
    setThinking(true);

    const AIMessage = await handlePrompt(
      email,
      prompt,
      timestamp,
      conversation!,
    );

    if (!AIMessage) {
      setConversationError(true);
    } else {
      setConversation([AIMessage, userMessage, ...conversation!]);
    }

    setThinking(false);
  };

  const handleKeyDown = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!e.shiftKey && e.key === "Enter") handleSubmit();
  };

  return loading ? (
    <ConversationLoading />
  ) : (
    <section className="flex h-[calc(100vh-4rem)] flex-col items-center sm:h-[calc(100vh-5rem)]">
      <main className="mt-4 mb-28 flex h-full w-full flex-col-reverse overflow-scroll px-2 md:w-[45rem] lg:w-[60rem]">
        {conversationError && <ConversationErrorMessage />}

        {thinking && <Thinking />}

        {conversation?.map((message, index) => (
          <MessageBubble message={message} key={index} />
        ))}

        {!thinking && conversation?.length === 0 && (
          <PromptSuggest setPrompt={setPrompt} />
        )}
      </main>
      <div className="fixed bottom-5 flex w-11/12 items-end gap-2 border-2 border-neutral-800 bg-neutral-950/50 px-5 py-3 text-white backdrop-blur-2xl md:w-[45rem]">
        <textarea
          rows={prompt.split("\n").length}
          className="max-h-40 w-full resize-none text-lg outline-none"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask something..."
        />
        <button onClick={handleSubmit}>
          <BiSend size={30} />
        </button>
      </div>
    </section>
  );
};

export default Chat;
