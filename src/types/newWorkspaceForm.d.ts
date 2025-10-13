type memberType = {
  name: string;
  email: string;
};

export type roleType = {
  title: string;
  color: string;
  members: memberType[];
  permissions: string[];
};
