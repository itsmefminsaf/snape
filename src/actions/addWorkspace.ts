"use server";

import connectDB from "@/lib/db";
import { ObjectId } from "mongodb";

export const linkGithubAccount = async (workspaceId: string, code: string) => {
  try {
    const tokenRes = await fetch(`${process.env.AUTH0_DOMAIN}/oauth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grant_type: "authorization_code",
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        code,
        redirect_uri: `${process.env.APP_BASE_URL}/api/auth/github/callback`,
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
