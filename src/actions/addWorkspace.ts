"use server";

import connectDB from "@/lib/db";
import { ObjectId } from "mongodb";

export const linkGithubAccount = async (workspaceId: string, githubToken: string) => {
  try {
    const workspaceCollection = await connectDB("workspaces");
    const update = await workspaceCollection.updateOne(
      { _id: new ObjectId(workspaceId) },
      { $set: { githubToken } },
    );

    return update.modifiedCount === 1;
  } catch (error) {
    console.log(`Error linking github account: ${error}`);
    return false;
  }
};

export const addWorkspace = async (workspaceJson: string) => {
  try {
    const workspace = JSON.parse(workspaceJson);
    
    const workspaceCollection = await connectDB("workspaces");

    const newWorkspace = await workspaceCollection.insertOne(workspace);

    return newWorkspace.insertedId.toString();
  } catch (error) {
    console.log(`Error creating workspace: ${error}`);
    return "";
  }
};
