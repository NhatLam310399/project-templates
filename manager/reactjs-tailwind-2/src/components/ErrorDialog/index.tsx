import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { colors } from "common/styles/colors";
import Button from "designs/Button";
import { useStyles } from "./styles";

interface IErrorDialogProps {
  isOpen: boolean;
  title: string;
  message?: string | undefined;
  className?: string;
  onClose?: () => void;
}

const ErrorDialog: React.FC<IErrorDialogProps> = props => {
  const { isOpen, title = "", message = "", className = "", onClose } = props;
  const classes = useStyles();

  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <div className={className}>
      <Dialog
        className={classes.root}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: colors.white,
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          <span className="font-bold leading-none text-error text-mxl">
            {title}
          </span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <span className="text-error opacity-60">{message}</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button innerClassName="h-4 px-3" onClick={() => handleClose()}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ErrorDialog;
