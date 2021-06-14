import React from "react";
import { ITaskBoards, ITasks } from "./Workspace";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AppsTwoToneIcon from "@material-ui/icons/AppsTwoTone";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { FormDialog } from "./NewTask";
import { Task } from "./Task";
import { MoveTask } from "./MoveTask";

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
  openTask,
  handleClickOpenTask,
  handleCloseTask,
  openMove,
  handleClickOpenMove,
  handleCloseMove,
  handleMove,
  currentStatus,
  handleMoveUpdate,
  uid,
}) => {
  const renderTaskList = (status: string) => {
    return (
      <List>
        {taskBoards
          .filter((item: ITaskBoards) => item.status === status)
          .filter((item) => item.uid === uid)
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
                <MoveTask
                  task={item}
                  open={openMove}
                  handleClickOpen={handleClickOpenMove}
                  handleClose={handleCloseMove}
                  handleMove={handleMove}
                  currentStatus={currentStatus}
                  handleMoveUpdate={handleMoveUpdate}
                />
                <Task
                  open={openTask}
                  handleClickOpen={handleClickOpenTask}
                  handleClose={handleCloseTask}
                  title={title}
                  description={description}
                  handleTitle={handleTitle}
                  handleDescription={handleDescription}
                  currentTask={item}
                  handleUpdate={handleUpdate}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    id={`${item.id}`}
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
