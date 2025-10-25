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

  const toolSchema = {
    text: "Your text response",
    action: "listRepo | createRepo | none",
    params: {
      listRepo: {},
      createRepo: { name: "repo name", description: "desc", private: true },
    },
  };

  const systemPrompt = `You are an AI agent integrated into a web app that manages GitHub accounts.
Always respond with a **valid JSON object** and nothing else.
The JSON must exactly follow this structure:

${JSON.stringify(toolSchema, null, 2)}

Rules:
1. Do not include markdown, code blocks, or commentary.
2. Do not explain your reasoning.
3. Output ONLY the JSON object.
4. If unsure about tool choice, use "none".
`;

  const messages: ModelMessage[] = [
    {
      role: "system",
      content: systemPrompt,
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
