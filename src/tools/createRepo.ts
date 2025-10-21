import { getAccessToken } from "@/actions/getWorkspaces";
import { jsonSchema, tool } from "ai";
import { Octokit } from "octokit";

const inputSchema = jsonSchema<{
  workspaceId: string;
  email: string;
  repositoryData: { name: string };
}>({
  type: "object",
  properties: {
    workspaceId: { type: "string" },
    email: { type: "string" },
    repositoryData: {
      type: "object",
      properties: { name: { type: "string" } },
    },
  },
});

const execute = async ({
  workspaceId,
  email,
  repositoryData,
}: {
  workspaceId: string;
  email: string;
  repositoryData: { name: string };
}) => {
  try {
    const accessToken = await getAccessToken(workspaceId, email, "create_repo");

    if (!accessToken) throw new Error("Permission denied.");

    const github = new Octokit({ auth: accessToken });

    const { data } = await github.request("POST /user/repos", {
      name: repositoryData.name,
    });

    return data;
  } catch (error) {
    throw error;
  }
};

const createRepo = tool({
  description:
    "Create a repository in the given workspaceId only of user has permission to do it",
  inputSchema,
  execute,
});

export default createRepo;
