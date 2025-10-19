"use server";

import { messageType } from "@/types/workspace";
import { createHuggingFace } from "@ai-sdk/huggingface";
import { generateText, ModelMessage, ToolSet } from "ai";

const huggingFace = createHuggingFace({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.OPENAI_API_KEY,
});

const askAI = async (prompt: string, messageHistory: messageType[]) => {
  const historyMessages: ModelMessage[] = messageHistory.map((message) => ({
    role: message.author === "agent@snape.ai" ? "assistant" : "user",
    content: message.text,
  }));

  const messages: ModelMessage[] = [
    {
      role: "system",
      content:
        " You are an AI agent named 'Snape' who has been integrated to a web application that allow users to create separate workspaces and manage it by prompting you",
    },
    ...historyMessages,
    { role: "user", content: prompt },
  ] as const;

  const chatCompletion = await generateText({
    model: huggingFace("deepseek-ai/DeepSeek-R1"),
    messages,
  });
  return chatCompletion.text;
};

export default askAI;
