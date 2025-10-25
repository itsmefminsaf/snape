"use server";

import createRepo from "@/tools/createRepo";
import listRepo from "@/tools/listRepo";
import { askAI2 } from "./huggingFace";
import createIssue from "@/tools/createIssue";

const getToolCallResult = async (
  action: string,
  text: string,
  params: {
    createRepo: { name: string; description: string; private: boolean };
    createIssue: { repo: string; issueData: { title: string; body?: string } };
  },
) => {
  switch (action) {
    case "listRepo":
      return await askAI2(text + (await listRepo()));

    case "createRepo":
      return await askAI2(text + (await createRepo(params.createRepo)));

    case "createIssue":
      return await askAI2(
        text +
          (await createIssue(
            params.createIssue.repo,
            params.createIssue.issueData,
          )),
      );

    case "none":
      return text;

    default:
      return text;
  }
};

export default getToolCallResult;
