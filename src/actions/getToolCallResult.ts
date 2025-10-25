"use server";

import createRepo from "@/tools/createRepo";
import listRepo from "@/tools/listRepo";
import { askAI2 } from "./huggingFace";

const getToolCallResult = async (
  action: string,
  text: string,
  params: {
    createRepo: { name: string; description: string; private: boolean };
  },
) => {
  switch (action) {
    case "listRepo":
      return await askAI2(text + (await listRepo()));

    case "createRepo":
      return await askAI2(text + (await createRepo(params.createRepo)));

    case "none":
      return text;

    default:
      return text;
  }
};

export default getToolCallResult;
