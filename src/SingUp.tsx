import React from "react";
import { AppContext } from "./GlobalState";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import firebase from "./database";

export const SignUp: React.FC = () => {
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

  const handleRegister = () => {
    let user = firebase.auth().createUserWithEmailAndPassword(email, password);
    user
      .then((userRef) => {
        console.log("user registered", userRef.user?.email);
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
      Sign Up
      <TextField onChange={handleEmail} label="Email" type="email" />
      <TextField onChange={handlePassword} label="Password" type="password" />
      <Button variant="outlined" color="primary" onClick={handleRegister}>
        Sign Up
      </Button>
      {error ? <div>{error}</div> : null}
    </div>
  );
};
