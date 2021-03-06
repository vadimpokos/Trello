import React, { useEffect } from "react";
import { Iworkspace, workspaceListType } from "../workspace.model";
import firebase from "../database";
import { WorkspacesView } from "./WorkspacesView";

import "fontsource-roboto";
import "../styles/Workspaces.css";

export const WorkspaceContainer: React.FC = () => {
  const [workspaceList, setWorkspaceList] = React.useState<workspaceListType>(
    []
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [newWorkspace, setNewWorkspace] = React.useState<{
    id: number;
    name: string;
    uid: string;
  }>({ id: 0, name: "", uid: "" });
  const [inputValue, setInputValue] = React.useState<Iworkspace["input"]>("");
  const [open, setOpen] = React.useState(false);
  const [uid, setUid] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const inputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(e.currentTarget.value);
  };

  const handleCreateWorkspace = () => {
    if (inputValue) {
      setWorkspaceList((prev) => [
        ...prev,
        { id: new Date().getTime(), name: inputValue, uid: uid },
      ]);
      setNewWorkspace({ id: new Date().getTime(), name: inputValue, uid: uid });
      handleClose();
    }
  };

  const handleDeleteWorkspace = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log(e.currentTarget.id);
    deleteDocument(e.currentTarget.id);
  };

  useEffect(() => {
    if (newWorkspace.name !== "") {
      addData();
      setInputValue("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newWorkspace]);

  const getData = async () => {
    let db = firebase
      .firestore()
      .collection("Dashboards")
      // .where("uid", "==", uid)
      .orderBy("id");
    await db
      .get()
      .then((res) => {
        let newState: workspaceListType = [];
        res.forEach((doc) => {
          newState.push({
            id: doc.data().id,
            name: doc.data().name,
            uid: doc.data().uid,
          });
        });
        setWorkspaceList([...newState]);
      })
      .then(() => setIsLoading(false))
      .catch((error) => {
        console.log("Error getting cached document:", error);
      });
  };

  const addData = async () => {
    console.log(newWorkspace);
    await firebase
      .firestore()
      .collection("Dashboards")
      .doc(`${newWorkspace.id}`)
      .set(newWorkspace)
      .then(() => {
        console.log("Document written");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  const deleteDocument = async (docname: string) => {
    // console.log(firebase.firestore().collection("Dashboards").doc(docname));
    await firebase
      .firestore()
      .collection("Dashboards")
      .doc(docname)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
    getData();
  };

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      setUid(user.uid);
      console.log(uid);
      // ...
    } else {
      console.log("no user");
      // User is signed out
      // ...
    }
  });

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {isLoading ? (
        "...Loading"
      ) : (
        <WorkspacesView
          workspaceList={workspaceList}
          input={inputValue}
          onChange={inputChange}
          onClick={handleCreateWorkspace}
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          onDelete={handleDeleteWorkspace}
          uid={uid}
        />
      )}
    </>
  );
};
