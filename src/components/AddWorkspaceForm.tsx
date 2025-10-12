"use client";

import { useAppState } from "@/context/appState";
import { CgClose } from "react-icons/cg";

const AddWorkspaceForm = () => {
  const appState = useAppState();
  return (
    appState?.state.showAddWorkSpaceForm && (
      <div className="fixed flex h-full w-full items-center justify-center bg-neutral-950/20 backdrop-blur-2xl">
        <form className="relative w-[40rem] max-w-9/10 border-2 border-neutral-800 bg-neutral-950/70 p-4 text-white backdrop-blur-2xl">
          <button
            type="reset"
            className="absolute top-2 right-2"
            onClick={() => appState.setState.setShowAddWorkSpaceForm(false)}
          >
            <CgClose />
          </button>
          <input type="text" placeholder="Enter workspace name" />
        </form>
      </div>
    )
  );
};

export default AddWorkspaceForm;
