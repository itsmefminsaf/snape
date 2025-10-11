"use server";

import { OpenAI } from "openai";

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

const openai = async (prompt: string) => {
  const chatCompletion = await client.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });
  return chatCompletion.choices[0].message;
};

export default openai;
