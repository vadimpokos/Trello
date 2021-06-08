import React from "react";
import { workspaceListType, Iworkspace } from "./workspace.model";

interface Icontext {
  workspaceList: workspaceListType[];
  addWorkspace: (value: workspaceListType) => void;
  inputValue: Iworkspace["input"];
  inputHandler: (value: Iworkspace["input"]) => void;
  open: boolean;
  openHandler: (value: boolean) => void;
  newWorkspace: workspaceListType;
  newWorkspaceHandler: (value: workspaceListType) => void;
}

export const WorkspaceListContext = React.createContext<Icontext>({
  workspaceList: [],
  addWorkspace: () => {},
  inputValue: "",
  inputHandler: () => {},
  open: false,
  openHandler: () => {},
  newWorkspace: {},
  newWorkspaceHandler: () => {},
});

const Context: React.FC<React.ReactNode> = ({ children }: any) => {
  const [workspaceList, setWorkspaceList] = React.useState<workspaceListType[]>(
    []
  );

  const addWorkspace = (newWorkspace: workspaceListType) =>
    setWorkspaceList((prev) => [...prev, newWorkspace]);

  const [inputValue, setInputValue] = React.useState<Iworkspace["input"]>("");
  const inputHandler = (newInputValue: Iworkspace["input"]) =>
    setInputValue(newInputValue);

  return (
    <WorkspaceListContext.Provider value={{ workspaceList, addWorkspace }}>
      {children}
    </WorkspaceListContext.Provider>
  );
};

export default Context;
