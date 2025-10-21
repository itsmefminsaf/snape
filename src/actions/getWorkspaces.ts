"use server";

import connectDB from "@/lib/db";
import { messageType, workspaceType } from "@/types/workspace";
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

    return workspace?.githubToken ? true : false;
  } catch (error) {
    throw new Error(`Error getting workspace data: ${error}`);
  }
};

export const fetchConversation = async (
  _id: string,
): Promise<messageType[]> => {
  try {
    const workspaceCollections = await connectDB("workspaces");
    const conversations = await workspaceCollections.findOne(
      { _id: new ObjectId(_id) },
      { projection: { _id: 0, conversation: 1 } },
    );

    return conversations?.conversation ? conversations?.conversation : [];
  } catch (error) {
    throw new Error(`Error fetching messages: ${error}`);
  }
};

export const getAccessToken = async (
  workspaceId: string,
  email: string,
  permission: string,
) => {
  try {
    const workspaceCollections = await connectDB("workspaces");
    const result = await workspaceCollections
      .aggregate([
        {
          $match: { _id: new ObjectId(workspaceId) },
        },
        {
          $unwind: "$roles",
        },
        {
          $match: {
            "roles.members": email,
            "roles.permissions": permission,
          },
        },
        {
          $project: {
            _id: 0,
            githubToken: 1,
          },
        },
      ])
      .toArray();

      if(!result) return null
      if(result.length === 0) return null
      if(!result[0].githubToken) return null

      return result[0].githubToken
  } catch (error) {
    throw error;
  }
};
