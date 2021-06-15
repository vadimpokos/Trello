import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ITaskBoards } from "../workspace.model";

interface ITaskDialog {
  open: boolean;
  handleClickOpen: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleClose: () => void;
  title: string;
  description: string;
  handleTitle: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  handleDescription: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  currentTask: ITaskBoards;
  handleUpdate: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Task: React.FC<ITaskDialog> = ({
  open,
  handleClickOpen,
  handleClose,
  title,
  description,
  handleTitle,
  handleDescription,
  currentTask,
  handleUpdate,
}) => {
  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        id={`${currentTask.id}`}
      >
        View
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
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            value={title}
            onChange={handleTitle}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            value={description}
            onChange={handleDescription}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            color="primary"
            // id={`${currentTask.name}`}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
