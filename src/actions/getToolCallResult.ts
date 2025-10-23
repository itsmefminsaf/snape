import createRepo from "@/tools/createRepo";
import listRepo from "@/tools/listRepo";

const getToolCallResult = async (
  action: string,
  workspaceId: string,
  email: string,
  params: { name: string; description: string; private: boolean },
) => {
  switch (action) {
    case "listRepo":
      return await listRepo({ workspaceId, email });

    case "createRepo":
      return await createRepo({
        workspaceId,
        email,
        repositoryData: params,
      });

    case "none":
      return "";

    default:
      return "";
  }
};

export default getToolCallResult;
