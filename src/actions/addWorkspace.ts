"use server";

import connectDB from "@/lib/db";

const addWorkspace = async (workspaceJson: string) => {
  try {
    const workspace = JSON.parse(workspaceJson);
    const workspaceCollection = await connectDB("workspaces");

    await workspaceCollection.insertOne(workspace);
  } catch (error) {
    throw new Error(`Error creating workspace: ${error}`);
  }
};

export default addWorkspace;
