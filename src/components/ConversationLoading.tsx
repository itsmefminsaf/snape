import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ConversationLoading = () => {
  return (
    <div className="center h-[calc(100vh-5rem)] w-full text-white">
      <AiOutlineLoading3Quarters className="animate-spin" size={60} />
    </div>
  );
};

export default ConversationLoading;
