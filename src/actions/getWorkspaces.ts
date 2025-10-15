"use server";

import connectDB from "@/lib/db";
import { sortedWorkspaceType, workspaceType } from "@/types/workspace";

const getWorkspaceList = async (
  email: string,
): Promise<sortedWorkspaceType[]> => {
  try {
    const workspaceCollection = await connectDB("workspaces");
    const workspaces = (await workspaceCollection
      .find({ "roles.members": email })
      .toArray()) as unknown as workspaceType[];

    const workspaceList: sortedWorkspaceType[] = workspaces.map((workspace) => {
      const userRole = workspace.roles.find((role) =>
        role.members.includes(email),
      );

      return {
        _id: workspace._id.toString(),
        workspaceName: workspace.workspaceName,
        role: {
          title: userRole?.title || "Unknown",
          color: userRole?.color || "#999999",
        },
      };
    });

    return workspaceList;
  } catch (error) {
    throw new Error(`Error getting workspaces: ${error}`);
  }
};

export default getWorkspaceList;
