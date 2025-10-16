"use server";

import connectDB from "@/lib/db";
import { workspaceType } from "@/types/workspace";
import { ObjectId } from "mongodb";

export const getWorkspaceList = async (
  email: string,
): Promise<workspaceType[]> => {
  try {
    const workspaceCollection = await connectDB("workspaces");

    const workspacesDocumentLink = await workspaceCollection
      .aggregate([
        { $match: { "roles.members": email } },
        {
          $project: {
            _id: 1,
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
      .toArray();

    const workspaceList: workspaceType[] = workspacesDocumentLink.map(
      (workspace) => {
        return {
          _id: workspace._id.toString(),
          workspaceName: workspace.workspaceName as string,
          roles: workspace.roles,
        };
      },
    );

    return workspaceList;
  } catch (error) {
    throw new Error(`Error getting workspaces: ${error}`);
  }
};

export const getWorkspaceGithubToken = async (_id: string) => {
  try {
    const workspaceCollections = await connectDB("workspaces");

    const aggregateCurser = workspaceCollections.aggregate([
      { $match: { _id: new ObjectId(_id) } },
      { $project: { _id: 0, githubToken: 1 } },
    ]);

    const workspace = await aggregateCurser.next();

    return workspace?.githubToken ? workspace.githubToken : null;
  } catch (error) {
    throw new Error(`Error getting workspace data: ${error}`);
  }
};
