"use server";

import connectDB from "@/lib/db";
import { workspaceType } from "@/types/workspace";
import { ObjectId } from "mongodb";

export const getWorkspaceList = async (email: string) => {
  try {
    const workspaceCollection = await connectDB("workspaces");

    const workspaces = (await workspaceCollection
      .aggregate([
        { $match: { "roles.members": email } },
        {
          $project: {
            _id: 0,
            workspaceName: 1,
            roles: {
              $filter: {
                input: "$roles",
                as: "role",
                cond: { $in: [email, "$$role.members"] },
              },
            },
          },
        },
      ])
      .toArray()) as unknown as workspaceType[];

    return workspaces;
  } catch (error) {
    throw new Error(`Error getting workspaces: ${error}`);
  }
};

export const getWorkspaceGHToken = async (_id: ObjectId) => {
  try {
    const workspaceCollections = await connectDB("workspaces");

    const workspace = workspaceCollections.aggregate([
      { $match: { _id } },
      { $project: { _id: 0, workspaceName: 1, roles: 0, githubToken: 1 } },
    ]) as unknown as workspaceType;

    return workspace.githubToken ? workspace.githubToken : null;
  } catch (error) {
    throw new Error(`Error getting workspace data: ${error}`);
  }
};
