import { linkGithubAccount } from "@/actions/addWorkspace";
import { useEffect, useState } from "react";
import { BsGithub } from "react-icons/bs";
import { FiLoader } from "react-icons/fi";
import { TiTick } from "react-icons/ti";

const LinkGithubAccountButton = ({
  newWorkspaceId,
  githubTokenExist,
  setGithubTokenExist,
}: {
  newWorkspaceId: string;
  githubTokenExist: boolean;
  setGithubTokenExist: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.data.code) {
        const success = await linkGithubAccount(
          newWorkspaceId,
          event.data.code,
        );
        
        setGithubTokenExist(success);
        setLoading(false);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [newWorkspaceId,githubTokenExist]);

  const handleConnect = () => {
    setLoading(true);
    window.open(
      `${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}&connection=github&redirect_uri=${encodeURIComponent(window.location.origin + "/api/auth/github/callback")}&scope=repo,user,read:org`,
      "_blank",
    );
  };

  return loading ? (
    <div className="center m-5 flex-col gap-5 text-2xl">
      <FiLoader className="animate-spin" size={40} /> <span>Connecting...</span>
    </div>
  ) : (
    <div className="center py-4">
      {githubTokenExist ? (
        <div className="center m-5 flex-col gap-5 text-xl">
          <TiTick size={80} className="text-green-600" />
          Github connected successfully
        </div>
      ) : (
        <button
          type="button"
          className="center m-5 flex-col gap-5 text-2xl"
          onClick={handleConnect}
        >
          <BsGithub size={35} /> <span>Connect Github Account</span>
        </button>
      )}
    </div>
  );
};

export default LinkGithubAccountButton;
