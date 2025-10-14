"use server";

import connectDB from "@/lib/db";

const getWorkspaces = async (email: string) => {
  try {
    const workspaceCollection = await connectDB("workspaces");
    const workspaces = await workspaceCollection
      .find({ "roles.members": email })
      .toArray();
    return workspaces;
  } catch (error) {
    throw new Error(`Error getting workspaces: ${error}`);
  }
};

export default getWorkspaces;
