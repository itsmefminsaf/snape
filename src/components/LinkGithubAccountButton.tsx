import { BsGithub } from "react-icons/bs";

const LinkGithubAccountButton = ({
  setGithubToken,
}: {
  setGithubToken: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const handleLink = () => {
    setGithubToken("token");
  };
  
  return (
    <button
      onClick={handleLink}
      type="button"
      className="center flex-col m-5 gap-5 text-2xl"
    >
      <BsGithub size={35}/> Connect Github Account
    </button>
  );
};

export default LinkGithubAccountButton;
