import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

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
      <Button variant="outlined" onClick={handleClickOpen}>
        delete
      </Button>
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
          <Button onClick={handleConfirm}>Okay</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
