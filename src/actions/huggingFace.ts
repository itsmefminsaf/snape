"use server";

import createRepo from "@/tools/createRepo";
import listRepo from "@/tools/listRepo";
import { messageType } from "@/types/workspace";
import { createHuggingFace } from "@ai-sdk/huggingface";
import { generateText, ModelMessage } from "ai";

const tools = { listRepo,createRepo };

const huggingFace = createHuggingFace({
  apiKey: process.env.OPENAI_API_KEY,
});

const askAI = async (
  prompt: string,
  messageHistory: messageType[],
  email: string,
  workspaceId: string,
) => {
  const historyMessages: ModelMessage[] = messageHistory.map((message) => ({
    role: message.author === "agent@snape.ai" ? "assistant" : "user",
    content: message.text,
  }));

  const messages: ModelMessage[] = [
    ...historyMessages,
    { role: "user", content: prompt },
  ]

  const chatCompletion = await generateText({
    model: huggingFace.languageModel("moonshotai/Kimi-K2-Instruct"),
    messages,
    system:
      "You are an AI agent named 'Snape' who has been integrated to a web application that allow users to create separate workspaces and manage it by prompting you " +
      ` Here is the workspaceId: ${workspaceId} and user's email: ${email}` + "don't include sensitive data in your response" +
      "Make sure you have included the tool call result in your text response. So the front-end can easily display it in markdown format",
    toolChoice: "auto",
    tools,
  });

  return chatCompletion.text;
};

export default askAI;
