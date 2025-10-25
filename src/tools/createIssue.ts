import auth0 from "@/lib/auth";
import { Octokit } from "octokit";

const createIssue = async ({
  repo,
  title,
  body,
}: {
  repo: string;
  title: string;
  body: string;
}) => {
  try {
    const { token } = await auth0.getAccessTokenForConnection({
      connection: "github",
    });

    if (!token) return "You have no access to create an issue...";

    const github = new Octokit({ auth: token });

    const { data } = await github.request("POST /repos/{owner}/{repo}/issues", {
      owner: (await github.request("GET /user")).data.login,
      repo,
      title,
      body,
    });

    return JSON.stringify(data);
  } catch (error) {
    console.log(error);
    return "Ohh no, something went wrong while creating issue";
  }
};

export default createIssue;
