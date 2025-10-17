type roleType = {
  title: string;
  color: string;
  members: string[];
  permissions: string[];
};

export type messageType = {
  author: string,
  text:string,
  timestamp: string
}

export type workspaceType = {
  _id: string;
  workspaceName: string;
  roles: roleType[];
  gitHubToken?: string
  conversation?: messageType[]
};
