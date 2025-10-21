import { getAccessToken } from "@/actions/getWorkspaces";
import { jsonSchema, tool } from "ai";
import { Octokit } from "octokit";

const inputSchema = jsonSchema<{ workspaceId: string; email: string }>({
  type: "object",
  properties: { workspaceId: { type: "string" }, email: { type: "string" } },
});

const execute = async ({
  workspaceId,
  email,
}: {
  workspaceId: string;
  email: string;
}) => {
  try {
    const accessToken = await getAccessToken(workspaceId, email, "read_repo");

    if (!accessToken) throw new Error("Permission denied.");

    const github = new Octokit({ auth: accessToken });

    const { data } = await github.request("GET /user/repos", {
      visibility: "all",
    });

    const filteredRepos = data.map((repo) => ({
      name: repo.name,
      description: repo.description || "No description provided.",
      language: repo.language || "Unknown",
      stars: repo.stargazers_count,
      url: repo.html_url,
      updatedAt: repo.updated_at,
      private: repo.private,
    }));

    return filteredRepos
  } catch (error) {
    throw error;
  }
};

const listRepo = tool({
  description:
    "List repositories for the given workspaceId only of user has permission to view it",
  inputSchema,
  execute,
});

export default listRepo;
