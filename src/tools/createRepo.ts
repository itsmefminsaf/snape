import auth0 from "@/lib/auth";
import { Octokit } from "octokit";

const createRepo = async (repositoryData: {
  name: string;
  description: string;
  private: boolean;
}) => {
  try {
    const { token } = await auth0.getAccessTokenForConnection({
      connection: "github",
    });

    if (!token) return "You have no access to create repository...";

    const github = new Octokit({ auth: token });

    const { data } = await github.request("POST /user/repos", {
      name: repositoryData.name,
      description: repositoryData.description,
      private: repositoryData.private ? true : false,
    });

    return JSON.stringify(data);
  } catch {
    return "Ohh no, something went wrong";
  }
};

export default createRepo;
