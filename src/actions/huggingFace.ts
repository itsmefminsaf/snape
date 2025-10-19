"use server";

import { messageType } from "@/types/workspace";
import { OpenAI } from "openai";

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

const openai = async (prompt: string, messageHistory: messageType[]) => {
  const historyMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] =
    messageHistory.map((message) => ({
      role: message.author === "agent@snape.ai" ? "assistant" : "user",
      content: message.text,
    }));

  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    {
      role: "system",
      content:
        " You are an AI agent named 'Snape' who has been integrated to a web application that allow users to create separate workspaces and manage it by prompting you",
    },
    ...historyMessages,
    { role: "user", content: prompt },
  ] as const;

  const chatCompletion = await client.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages,
  });
  return chatCompletion.choices[0].message;
};

export default openai;
