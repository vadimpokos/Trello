import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { ITasks } from "./Workspace";

export const FormDialog: React.FC<ITasks> = ({
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
}) => {
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Open form dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Card</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere
            labore dolores quod, dolorum perspiciatis expedita vitae iure quas
            sit ab asperiores dignissimos cupiditate dolorem nam dolor et
            doloribus, temporibus omnis?
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="text"
            fullWidth
            value={title}
            onChange={handleTitle}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            multiline
            fullWidth
            value={description}
            onChange={handleDescription}
          />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            onChange={handleStatus}
          >
            <MenuItem value={"todo"}>To do</MenuItem>
            <MenuItem value={"inprogress"}>In Progress</MenuItem>
            <MenuItem value={"completed"}>Completed</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={create} color="primary">
            Create!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
