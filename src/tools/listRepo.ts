import auth0 from "@/lib/auth";
import { Octokit } from "octokit";

const listRepo = async () => {
  try {
    const { token } = await auth0.getAccessTokenForConnection({
      connection: "github",
    });

    if (!token) return "You have no access to view repositories...";

    const github = new Octokit({ auth: token });

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
  } catch (error) {
    console.log(error);
    return "Ohh no, something went wrong";
  }
};

export default listRepo;
