import { ObjectId } from "mongodb";

type roleType = {
  title: string;
  color: string;
  members: string[];
  permissions: string[];
};

export type workspaceType = {
  _id: ObjectId;
  workspaceName: string;
  roles: roleType[];
  githubToken?: string
};
