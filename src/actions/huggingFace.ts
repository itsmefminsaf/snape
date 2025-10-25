"use server";

import { createHuggingFace } from "@ai-sdk/huggingface";
import { generateObject, generateText, ModelMessage, ToolContent } from "ai";
import { messageType } from "../../types/message";
import { toolSelectType } from "../../types/toolSelect";
import z from "zod";

const huggingFace = createHuggingFace({
  apiKey: process.env.HF_TOKEN,
});

export const snape = async (
  prompt: string,
  tool: ToolContent,
  messageHistory: messageType[],
) => {
  const historyMessages: ModelMessage[] = messageHistory.map((message) => ({
    role: message.author,
    content: message.text,
  }));

  const system =
    "You are an AI agent called 'Snape' integrated into a web app that manages GitHub accounts";

  const messages: ModelMessage[] = [
    {
      role: "system",
      content: system,
    },
    ...historyMessages,
    { role: "tool", content: tool },
    { role: "user", content: prompt },
  ];

  const chatCompletion = await generateText({
    model: huggingFace.languageModel("moonshotai/Kimi-K2-Instruct"),
    messages,
  });

  return chatCompletion.text;
};
export const toolSelect = async (prompt: string) => {
  const { object } = await generateObject({
    model: huggingFace.languageModel("moonshotai/Kimi-K2-Instruct"),
    schema: z.object({
      action: z.enum([
        "listRepo",
        "createRepo",
        "createIssue",
        "none",
        "dataRequired",
      ]),
      params: z.union([
        z
          .object({ type: z.enum(["private", "public", "all"]).default("all") })
          .default({ type: "all" }),
        z
          .object({
            name: z.string().default("new-repo"),
            description: z.string().default(""),
            private: z.boolean().default(false),
          })
          .partial()
          .default({}),
        z
          .object({
            repoName: z.string().default(""),
            title: z.string().default(""),
            body: z.string().default(""),
          })
          .partial()
          .default({}),
        z.array(z.string()).optional().default([]),
        z.literal("none").optional().default("none"),
      ]),
    }),
    system: `
You are an AI model that selects which GitHub tool to call.
Always output valid JSON with { "action": "...", "params": { ... } }.
If unsure of params, provide a safe default instead of an empty object.`,
    prompt,
  });

  return object as toolSelectType;
};
