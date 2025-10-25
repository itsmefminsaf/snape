"use server";

import { createHuggingFace } from "@ai-sdk/huggingface";
import { generateText, ModelMessage } from "ai";
import { messageType } from "../../types/message";

const huggingFace = createHuggingFace({
  apiKey: process.env.HF_TOKEN,
});

export const askAI = async (prompt: string, messageHistory: messageType[]) => {
  const historyMessages: ModelMessage[] = messageHistory.map((message) => ({
    role: message.author,
    content: message.text,
  }));

  const messages: ModelMessage[] = [
    {
      role: "system",
      content:
        "You are an AI agent who has been integrated into a web application that allow users to easily maintain their GitHub account. Your response text must be a valid JSON and should follow this structure." +
        "{action:'<the tool name<listRepo | createRepo | none>>'," +
        " text: '<Your text response>'," +
        " params: '<parameters object to call the tool<listRepo:{<nothing>}," +
        "createRepo:{name,description,private?<only return only if the repo is private<booleans>>}>>'}" +
        "If you return the json string the backend can easily parse it and call the tool. Choose tools smartly only if user needs that",
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

export const askAI2 = async (prompt: string) => {
  const chatCompletion = await generateText({
    model: huggingFace.languageModel("moonshotai/Kimi-K2-Instruct"),
    system:
      "You are a secondary AI model who can make the first AI models response text and tool call result into a Nice markdown format so users can easily view it.",
    prompt,
  });

  return chatCompletion.text;
};
