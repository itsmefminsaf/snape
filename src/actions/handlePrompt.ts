"use server";

import { messageType } from "@/types/workspace";
import askAI from "./huggingFace";
import connectDB from "@/lib/db";
import { ObjectId, PushOperator } from "mongodb";

const handlePrompt = async (
  workspaceId: string,
  text: string,
  author: string,
  timestamp: string,
  conversation: messageType[],
): Promise<messageType | null> => {
  try {
    const res = await askAI(text, conversation);

    const newConversation: messageType = {
      author: "agent@snape.ai",
      text: res,
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
