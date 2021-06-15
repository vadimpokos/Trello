import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ITaskBoards } from "../workspace.model";

interface IMove {
  task: ITaskBoards;
  open: boolean;
  handleClose: () => void;
  handleClickOpen: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleMove: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  currentStatus: { status: string; id: string };
  handleMoveUpdate: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

export const MoveTask: React.FC<IMove> = ({
  task,
  open,
  handleClickOpen,
  handleClose,
  handleMove,
  currentStatus,
  handleMoveUpdate,
}) => {
  const STATUS_MAP = [
    { description: "To Do", status: "todo" },
    { description: "In Progress", status: "inprogress" },
    { description: "Completed", status: "completed" },
  ];

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        id={`${task.id}`}
      >
        Move
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          {STATUS_MAP.filter(
            (item) => item.status !== currentStatus.status
          ).map((item, index) => {
            return (
              <Button
                color="primary"
                id={item.status}
                key={index}
                onClick={handleMoveUpdate}
              >
                {item.description}
              </Button>
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
