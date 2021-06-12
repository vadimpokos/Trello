import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import { Iprops } from "../workspace.model";

export const FormDialog: React.FC<Iprops> = ({
  input,
  onChange,
  onClick,
  open,
  handleClickOpen,
  handleClose,
}) => {
  return (
    <div>
      <IconButton color="primary" aria-label="add" onClick={handleClickOpen}>
        <AddOutlinedIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Workspace</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Type name and click on Create button to create new Workspace
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Workspace Name"
            type="text"
            fullWidth
            onChange={onChange}
            value={input}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onClick} color="primary">
            Create!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
