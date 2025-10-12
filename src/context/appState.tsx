"use client";

import { createContext, useContext, useState } from "react";

type UIState = {
  showProfileDropDown: boolean;
  showAddWorkSpaceForm: boolean;
};

type UISetters = {
  setShowProfileDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAddWorkSpaceForm: React.Dispatch<React.SetStateAction<boolean>>;
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

  const appState: appStateType = {
    state: { showProfileDropDown, showAddWorkSpaceForm },
    setState: { setShowProfileDropDown, setShowAddWorkSpaceForm },
  };

  return (
    <AppStateContext.Provider value={appState}>
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;
