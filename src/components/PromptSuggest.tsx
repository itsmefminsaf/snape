import { BsRobot } from "react-icons/bs";

const promptSuggest = [
  "List all my public repositories",
  "Create a private repository",
  "Create a PR",
  "List the issue from the repository",
];

const PromptSuggest = ({
  setPrompt,
}: {
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="center size-full flex-col gap-3 text-white">
      <BsRobot size={50} className="animate-bounce" />{" "}
      <p>Snape awaits for your command</p>
      <div className="grid grid-cols-2 gap-2 p-3 text-sm">
        {promptSuggest.map((prompt, index) => (
          <button
            onClick={() => setPrompt(prompt)}
            key={index}
            className="border-2 border-neutral-800 bg-neutral-950/50 p-2 px-3 text-left backdrop-blur-2xl"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PromptSuggest;
