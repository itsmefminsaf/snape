"use server";

import createRepo from "@/tools/createRepo";
import listRepo from "@/tools/listRepo";
import createIssue from "@/tools/createIssue";
import { toolSelectType } from "../../types/toolSelect";
import { ToolContent } from "ai";

const getToolCallResult = async ({
  action,
  params,
}: toolSelectType): Promise<ToolContent> => {
  switch (action) {
    case "listRepo":
      return [
        {
          toolName: action,
          toolCallId: "",
          type: "tool-result",
          output: { type: "json", value: await listRepo() },
        },
      ];

    case "createRepo":
      return [
        {
          toolName: action,
          toolCallId: "",
          type: "tool-result",
          output: { type: "json", value: await createRepo(params) },
        },
      ];

    case "createIssue":
      return [
        {
          toolName: action,
          toolCallId: "",
          type: "tool-result",
          output: { type: "json", value: await createIssue(params) },
        },
      ];

    case "dataRequired":
      return [
        {
          toolName: action,
          toolCallId: "",
          type: "tool-result",
          output: { type: "json", value: params },
        },
      ];

    case "none":
      return [
        {
          toolName: action,
          toolCallId: "",
          type: "tool-result",
          output: { type: "json", value: "" },
        },
      ];

    default:
      return [
        {
          toolName: action,
          toolCallId: "",
          type: "tool-result",
          output: { type: "json", value: "" },
        },
      ];
  }
};

export default getToolCallResult;
