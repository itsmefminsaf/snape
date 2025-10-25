"use server";

import connectDB from "@/lib/db";
import { messageType } from "../../types/message";

const fetchConversation = async (email: string): Promise<messageType[]> => {
  try {
    const workspaceCollections = await connectDB();

    const user = await workspaceCollections.findOne(
      { email },
      { projection: { _id: 0, conversation: 1 } },
    );

    return user ? user.conversation : [];
  } catch (error) {
    throw new Error(`Error fetching messages: ${error}`);
  }
};

export default fetchConversation;
