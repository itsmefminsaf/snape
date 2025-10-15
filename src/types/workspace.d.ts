import { ObjectId } from "mongodb";

export type roleType = {
  title: string;
  color: string;
  members: string[];
  permissions: string[];
};

export type sortedWorkspaceType = {
  _id: string;
  workspaceName: string;
  role: { title: string; color: string };
};

export type workspaceType = {
  _id: ObjectId;
  workspaceName: string;
  roles: roleType[];
};
