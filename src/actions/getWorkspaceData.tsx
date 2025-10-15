"use server";

import connectDB from "@/lib/db";
import { workspaceType } from "@/types/workspace";
import { ObjectId } from "mongodb";

const getWorkspaceData = async (_id: string) => {
  try {
    const workspaceCollections = await connectDB("workspaces");
    const workspace = (await workspaceCollections.findOne({
      _id: new ObjectId(_id),
    })) as workspaceType;

    return JSON.stringify(workspace);
  } catch (error) {
    throw new Error(`Error getting workspace data: ${error}`);
  }
};

export default getWorkspaceData;
