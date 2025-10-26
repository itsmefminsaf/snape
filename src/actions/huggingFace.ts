"use server";

import { createHuggingFace } from "@ai-sdk/huggingface";
import { generateText, ModelMessage } from "ai";
import { messageType } from "../../types/message";
import auth0 from "@/lib/auth";
import { Octokit } from "octokit";

const huggingFace = createHuggingFace({
  apiKey: process.env.HF_TOKEN,
});

export const snape = async (prompt: string, messageHistory: messageType[]) => {
  const { token } = await auth0.getAccessTokenForConnection({
    connection: "github",
  });

  const github = new Octokit({ auth: token });

  const { data } = await github.request("GET /user/repos", {
    visibility: "all",
  });

  const dataString = JSON.stringify(data);

  const historyMessages: ModelMessage[] = messageHistory.map((message) => ({
    role: message.author,
    content: message.text,
  }));

  const system =
    "You are an AI agent called 'Snape' integrated into a web app that manages GitHub accounts" +
    "Here is the users repository data" +
    dataString;

  const messages: ModelMessage[] = [
    {
      role: "system",
      content: system,
    },
    ...historyMessages,
    { role: "user", content: prompt },
  ];

  const chatCompletion = await generateText({
    model: huggingFace.languageModel("moonshotai/Kimi-K2-Instruct"),
    messages,
  });

  return chatCompletion.text;
};
