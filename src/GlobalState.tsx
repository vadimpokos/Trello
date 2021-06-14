import React from "react";

type State = {
  isLogin: boolean;
};

type Action = {
  type: "login" | "logout";
};

export const InitialState = {
  isLogin: false,
  LOGIN: () => {},
  LOGOUT: () => {},
};

export const AppContext = React.createContext(InitialState);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "login":
      return { isLogin: true };
    case "logout":
      return { isLogin: false };
    default:
      return state;
  }
};

export const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, InitialState);

  return (
    <AppContext.Provider
      value={{
        isLogin: state.isLogin,
        LOGIN: () => dispatch({ type: "login" }),
        LOGOUT: () => dispatch({ type: "logout" }),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
