export type toolSelectType =
  | {
      action: "listRepo";
      params: { type: "private" | "public" | "all" };
    }
  | {
      action: "createRepo";
      params: { name: string; description: string; private: boolean };
    }
  | {
      action: "createIssue";
      params: { repo: string; title: string; body: string };
    }
  | {
      action: "dataRequired" | "none";
      params: null;
    };
