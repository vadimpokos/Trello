import React from "react";
import { ITaskBoards, ITasks } from "./Workspace";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import HomeTwoToneIcon from "@material-ui/icons/HomeTwoTone";
import RefreshIcon from "@material-ui/icons/Refresh";
import AppsTwoToneIcon from "@material-ui/icons/AppsTwoTone";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { FormDialog } from "./NewTask";

export const WorkspaceView: React.FC<ITasks> = ({
  taskBoards,
  title,
  description,
  status,
  create,
  handleTitle,
  handleDescription,
  handleStatus,
  open,
  handleOpen,
  handleClose,
  handleDelete,
  handleUpdate,
}) => {
  const renderTaskList = (status: string) => {
    return (
      <List>
        {taskBoards
          .filter((item: ITaskBoards) => item.status === status)
          .map((item: ITaskBoards) => {
            return (
              <ListItem key={item.id}>
                <ListItemAvatar>
                  <Avatar>
                    <AppsTwoToneIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={item.description}
                />
                <input value={title} onChange={handleTitle} />
                <input value={description} onChange={handleDescription} />
                <IconButton
                  id={item.name}
                  value="update"
                  onClick={handleUpdate}
                >
                  <RefreshIcon />
                </IconButton>
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    id={item.name}
                    aria-label="delete"
                    onClick={handleDelete}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
      </List>
    );
  };

  const renderTaskBoardsList = () => {
    return (
      <>
        <Card variant="outlined">
          <CardContent>ToDo</CardContent>
          <CardContent>{renderTaskList("todo")}</CardContent>
        </Card>
        <Card variant="outlined">
          <CardContent>In Progress</CardContent>
          <CardContent>{renderTaskList("inprogress")}</CardContent>
        </Card>
        <Card variant="outlined">
          <CardContent>Completed</CardContent>
          <CardContent>{renderTaskList("completed")}</CardContent>
        </Card>
        <FormDialog
          taskBoards={taskBoards}
          title={title}
          description={description}
          status={status}
          create={create}
          handleTitle={handleTitle}
          handleDescription={handleDescription}
          handleStatus={handleStatus}
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      </>
    );
  };
  return renderTaskBoardsList();
};
