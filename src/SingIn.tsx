import React from "react";
import { AppContext } from "./GlobalState";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import firebase from "./database";

export const SignIn: React.FC = () => {
  const context = React.useContext(AppContext);
  const { LOGIN } = context;

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleEmail = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmail(e.target.value);
  };

  const handlePassword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    let user = firebase.auth().signInWithEmailAndPassword(email, password);
    user
      .then((userRef) => {
        console.log("user signed in", userRef.user?.email);
        LOGIN();
      })
      .catch((err) => {
        setError(err.message);
        console.log(err);
        setTimeout(() => setError(""), 5000);
      });
  };

  return (
    <div>
      Sign In
      <TextField onChange={handleEmail} label="Email" type="email" />
      <TextField onChange={handlePassword} label="Password" type="password" />
      <Button variant="outlined" color="primary" onClick={handleLogin}>
        Sign In
      </Button>
      {error ? <div>{error}</div> : null}
    </div>
  );
};
