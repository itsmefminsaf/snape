"use server";

import { messageType } from "@/types/workspace";
import { askAI, askAI2 } from "./huggingFace";
import connectDB from "@/lib/db";
import { ObjectId, PushOperator } from "mongodb";
import getToolCallResult from "./getToolCallResult";

const handlePrompt = async (
  workspaceId: string,
  prompt: string,
  author: string,
  timestamp: string,
  conversation: messageType[],
): Promise<messageType | null> => {
  try {
    const AIresult = await askAI(prompt, conversation);

    const { action, text, params } = JSON.parse(AIresult);

    const toolCallResult = await getToolCallResult(
      action,
      workspaceId,
      author,
      params,
    );

    const textAfterToolCalling = text + toolCallResult;

    const finalText = await askAI2(textAfterToolCalling);

    const newConversation: messageType = {
      author: "agent@snape.ai",
      text: finalText,
      timestamp: new Date().toUTCString(),
    };

    const workspaceCollection = await connectDB("workspaces");

    const updateCurser = await workspaceCollection.updateOne(
      { _id: new ObjectId(workspaceId) },
      {
        $push: {
          conversation: {
            $each: [{ author, text, timestamp }, newConversation],
          },
        },
      } as PushOperator<Document>,
    );

    return updateCurser.modifiedCount === 1 ? newConversation : null;
  } catch (error) {
    console.log(`Error prompting: ${error}`);
    return null;
  }
};

export default handlePrompt;
