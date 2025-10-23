import { getAccessToken } from "@/actions/getWorkspaces";
import { Octokit } from "octokit";

const listRepo = async ({
  workspaceId,
  email,
}: {
  workspaceId: string;
  email: string;
}) => {
  try {
    const accessToken = await getAccessToken(workspaceId, email, "read_repo");

    if (!accessToken) return "You have no access to view repositories...";

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

    return JSON.stringify(filteredRepos);
  } catch {
    return "Ohh no, something went wrong";
  }
};

export default listRepo;
