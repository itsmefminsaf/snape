"use server";

import connectDB from "@/lib/db";

const addWorkspace = async (workspaceJson: string) => {
  try {
    const workspace = JSON.parse(workspaceJson);
    const workspaceCollection = await connectDB("workspaces");

    const newWorkspace = await workspaceCollection.insertOne(workspace);

    return newWorkspace.insertedId.toString();
  } catch (error) {
    throw new Error(`Error creating workspace: ${error}`);
  }
};

export default addWorkspace;
