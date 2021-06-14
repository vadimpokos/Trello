import React from "react";
import { WorkspaceContainer } from "./components/WorkspacesContainer";
import { AppContext } from "./GlobalState";
import { SignIn } from "./SingIn";
import { SignUp } from "./SingUp";
import Button from "@material-ui/core/Button";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

export const Router: React.FC = () => {
  const context = React.useContext(AppContext);
  const { isLogin } = context;

  return (
    <>
      {isLogin ? (
        <WorkspaceContainer />
      ) : (
        <>
          <BrowserRouter>
            <Link to="/">
              {/* <div>
                <IconButton>
                  <HomeTwoToneIcon />
                </IconButton>
              </div> */}
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
            <Switch>
              <Route path="/" exact>
                <SignIn />
              </Route>
              <Route path="/signup">
                <SignUp />
              </Route>
            </Switch>
          </BrowserRouter>
        </>
      )}
    </>
  );
};
