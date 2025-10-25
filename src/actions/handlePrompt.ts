"use server";

import { askAI } from "./huggingFace";
import connectDB from "@/lib/db";
import { PushOperator } from "mongodb";
import getToolCallResult from "./getToolCallResult";
import { messageType } from "../../types/message";

const handlePrompt = async (
  email: string,
  prompt: string,
  timestamp: string,
  oldConversation: messageType[],
): Promise<messageType | null> => {
  try {
    const AIresult = await askAI(prompt, oldConversation);

    const { action, text, params } = JSON.parse(AIresult);

    const toolCallResult = await getToolCallResult(action, text, params);

    const AIMessage: messageType = {
      author: "assistant",
      text: toolCallResult,
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
