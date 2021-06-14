import { Workspace } from "./Workspace";
import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import HomeTwoToneIcon from "@material-ui/icons/HomeTwoTone";
import AppsTwoToneIcon from "@material-ui/icons/AppsTwoTone";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Iprops } from "../workspace.model";
import { FormDialog } from "./NewWorkspace";
import { AppContext } from "../GlobalState";

export const WorkspacesView: React.FC<Iprops> = ({
  workspaceList,
  input,
  onChange,
  onClick,
  open,
  handleClickOpen,
  handleClose,
  onDelete,
  uid,
}) => {
  const context = React.useContext(AppContext);
  const { LOGOUT } = context;

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
          {workspaceList
            .filter((item) => item.uid === uid)
            .map((item, index) => {
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
            <Button variant="outlined" color="primary" onClick={LOGOUT}>
              Logout
            </Button>
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
              uid={uid}
            />
          </Route>
          {renderWorkspace()}
        </Switch>
      </Router>
    </>
  );
};
