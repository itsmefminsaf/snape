"use server";

import connectDB from "@/lib/db";
import { PushOperator } from "mongodb";
import getToolCallResult from "./getToolCallResult";
import { messageType } from "../../types/message";
import { snape, toolSelect } from "./huggingFace";

const handlePrompt = async (
  email: string,
  prompt: string,
  timestamp: string,
  oldConversation: messageType[],
): Promise<messageType | null> => {
  try {
    const tool = await toolSelect(prompt);

    const toolCallResult = await getToolCallResult(tool);

    const text = await snape(prompt, toolCallResult, oldConversation);

    const AIMessage: messageType = {
      author: "assistant",
      text,
      timestamp: new Date().toUTCString(),
    };

    const workspaceCollection = await connectDB();

    const updated = await workspaceCollection.updateOne(
      { email },
      {
        $push: {
          conversation: {
            $each: [{ author: "user", text: prompt, timestamp }, AIMessage],
          },
        },
      } as PushOperator<Document>,
      { upsert: true },
    );

    return updated.acknowledged ? AIMessage : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default handlePrompt;
