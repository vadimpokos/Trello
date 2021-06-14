import React from "react";
import { AppProvider } from "./GlobalState";
import { Router } from "./Router";

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
};

export default App;
