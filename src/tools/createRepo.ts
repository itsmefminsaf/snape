import { getAccessToken } from "@/actions/getWorkspaces";
import { Octokit } from "octokit";

const createRepo = async ({
  workspaceId,
  email,
  repositoryData,
}: {
  workspaceId: string;
  email: string;
  repositoryData: { name: string; description: string; private: boolean };
}) => {
  try {
    const accessToken = await getAccessToken(workspaceId, email, "create_repo");

    if (!accessToken) return "You have no access to create repository...";

    const github = new Octokit({ auth: accessToken });

    const { data } = await github.request("POST /user/repos", {
      name: repositoryData.name,
      description: repositoryData.description,
      private: repositoryData.private ? true : false,
    });

    return JSON.stringify(data);
  } catch (error) {
    return "Ohh no, something went wrong";
  }
};

export default createRepo;
