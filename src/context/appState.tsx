"use client";

import { workspaceType } from "@/types/workspace";
import { createContext, useContext, useState } from "react";

type UIState = {
  showProfileDropDown: boolean;
  showAddWorkSpaceForm: boolean;
  openWorkspace: workspaceType | null;
};

type UISetters = {
  setShowProfileDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAddWorkSpaceForm: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenWorkspace: React.Dispatch<React.SetStateAction<workspaceType | null>>;
};

export type appStateType = {
  state: UIState;
  setState: UISetters;
};

const AppStateContext = createContext<appStateType | null>(null);

export const useAppState = () => useContext(AppStateContext);

const AppStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [showProfileDropDown, setShowProfileDropDown] = useState(false);
  const [showAddWorkSpaceForm, setShowAddWorkSpaceForm] = useState(false);
  const [openWorkspace, setOpenWorkspace] = useState<workspaceType | null>(
    null,
  );

  const appState: appStateType = {
    state: { showProfileDropDown, showAddWorkSpaceForm, openWorkspace },
    setState: {
      setShowProfileDropDown,
      setShowAddWorkSpaceForm,
      setOpenWorkspace,
    },
  };

  return (
    <AppStateContext.Provider value={appState}>
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;
