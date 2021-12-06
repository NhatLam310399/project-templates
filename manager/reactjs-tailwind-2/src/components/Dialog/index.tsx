import React, { useState, useEffect } from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import DialogMaterial from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";

import Button from "designs/Button";
import { colors } from "common/styles/colors";
import { useDialogStyles } from "common/styles/muiStyles/useStyles";

export * from "./components/DialogTitle";
export * from "./components/AddButton";

interface IDialogProps {
  ButtonMenu: React.ReactElement;
  onConfirm?: () => void;
  onToggle?: (isOpen: boolean) => void;
  className?: string;
  size?: "sm" | "xs" | "md" | "lg" | "xl";
  onClose?: () => void;
}

const Dialog: React.FC<IDialogProps> = props => {
  const {
    ButtonMenu,
    children,
    onConfirm,
    onClose,
    onToggle,
    className = "",
    size = "sm",
  } = props;
  const classes = useDialogStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    onToggle && onToggle(true);
  };

  const handleClose = () => {
    setOpen(false);
    onClose && onClose();
    onToggle && onToggle(false);
  };

  const handleConfirm = () => {
    onConfirm && onConfirm();
    handleClose();
  };

  return (
    <>
      <div className={className}>
        <button
          type="button"
          className="block w-full"
          onClick={handleClickOpen}
        >
          {ButtonMenu}
        </button>
      </div>
      <DialogMaterial
        open={open}
        onClose={handleClose}
        className={classes?.root}
        aria-labelledby="customized-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={size}
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: colors.white,
            padding: "0",
          },
        }}
      >
        <ValidatorForm onSubmit={handleConfirm} className="p-2 phone:p-4">
          {children}
          <DialogActions className="mt-2 phone:mt-4">
            <Button
              secondary
              className="mr-1"
              innerClassName="py-1 px-2.5 phone:px-3.5 h-4 font-semibold normal-case"
              onClick={handleClose}
              type="button"
            >
              Huỷ
            </Button>
            <Button
              primary
              innerClassName="py-1 px-2 phone:px-3.5 h-4 font-semibold normal-case"
              type="submit"
            >
              Đồng ý
            </Button>
          </DialogActions>
        </ValidatorForm>
      </DialogMaterial>
    </>
  );
};

export default Dialog;
