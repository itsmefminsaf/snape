"use server";

import connectDB from "@/lib/db";
import { ObjectId } from "mongodb";

export const linkGithubAccount = async (workspaceId: string, code: string) => {
  try {
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const data = await tokenRes.json();
  const githubToken = data.access_token;

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
