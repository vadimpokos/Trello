import React, { useEffect } from "react";
import { Workspace } from "./Workspace";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Iworkspace, Iprops, workspaceListType } from "../workspace.model";
import firebase from "../database";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import HomeTwoToneIcon from "@material-ui/icons/HomeTwoTone";
import AppsTwoToneIcon from "@material-ui/icons/AppsTwoTone";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import "fontsource-roboto";
import "../styles/Workspaces.css";
import { FormDialog } from "./NewWorkspace";

export const WorkspaceContainer: React.FC = () => {
  const [workspaceList, setWorkspaceList] = React.useState<workspaceListType>(
    []
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [newWorkspace, setNewWorkspace] = React.useState<{
    id: number;
    name: string;
  }>({ id: 0, name: "" });
  const [inputValue, setInputValue] = React.useState<Iworkspace["input"]>("");
  const [open, setOpen] = React.useState(false);

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
        { id: new Date().getTime(), name: inputValue },
      ]);
      setNewWorkspace({ id: new Date().getTime(), name: inputValue });
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
    let db = firebase.firestore().collection("Dashboards").orderBy("id");
    await db
      .get()
      .then((res) => {
        let newState: workspaceListType = [];
        res.forEach((doc) => {
          newState.push({ id: doc.data().id, name: doc.data().name });
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
      .doc(newWorkspace.name)
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

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {isLoading ? (
        "...Loading"
      ) : (
        <WorkspaceView
          workspaceList={workspaceList}
          input={inputValue}
          onChange={inputChange}
          onClick={handleCreateWorkspace}
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          onDelete={handleDeleteWorkspace}
        />
      )}
    </>
  );
};

const WorkspaceView: React.FC<Iprops> = ({
  workspaceList,
  input,
  onChange,
  onClick,
  open,
  handleClickOpen,
  handleClose,
  onDelete,
}) => {
  const renderWorkspace = () => {
    return workspaceList.map(({ id, name }, index) => (
      <Route key={index} path={`/${name}`}>
        <Workspace name={name} />
      </Route>
    ));
  };

  const renderWorkspaceList = () => {
    return (
      <div className="list-wrapper">
        <List>
          {workspaceList.map((item, index) => {
            return (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar>
                    <AppsTwoToneIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={<Link to={`/${item.name}`}>{item.name}</Link>}
                  secondary="Workspace"
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    id={item.name}
                    aria-label="delete"
                    onClick={onDelete}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  };

  return (
    <>
      <Router>
        <Link to="/">
          <div>
            <IconButton>
              <HomeTwoToneIcon />
            </IconButton>
          </div>
        </Link>
        <Switch>
          <Route path="/" exact>
            {renderWorkspaceList()}
            <FormDialog
              input={input}
              onClick={onClick}
              onChange={onChange}
              open={open}
              handleClickOpen={handleClickOpen}
              handleClose={handleClose}
              workspaceList={workspaceList}
              onDelete={onDelete}
            />
          </Route>
          {renderWorkspace()}
        </Switch>
      </Router>
    </>
  );
};
