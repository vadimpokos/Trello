import React from "react";
import { WorkspaceContainer } from "./components/WorkspacesContainer";
import Context from "./GlobalState";

const App: React.FC = () => {
  return (
    <Context>
      <WorkspaceContainer />
    </Context>
  );
};

export default App;
