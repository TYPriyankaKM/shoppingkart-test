import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import DeleteIcon from "@mui/icons-material/Delete";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDialogButton({ title, onConfirm }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancle = () => {
    setOpen(false);
    onConfirm(false);
  };
  const handleConfirm = () => {
    setOpen(false);
    onConfirm(true);
  };

  return (
    <div>
      <Button
        color="error"
        onClick={handleClickOpen}
        startIcon={<DeleteIcon />}
        size="small"
      ></Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCancle}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogActions>
          <Button onClick={handleCancle}>Cancel</Button>
          <Button color="error" onClick={handleConfirm}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
