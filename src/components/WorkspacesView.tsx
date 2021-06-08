import React from "react";
import { Workspace } from "./Workspace";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Iprops } from "../workspace.model";
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

export const WorkspaceView: React.FC<Iprops> = ({
  workspaceList,
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
            <FormDialog />
          </Route>
          {renderWorkspace()}
        </Switch>
      </Router>
    </>
  );
};
