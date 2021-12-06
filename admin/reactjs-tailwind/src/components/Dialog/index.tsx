import React, { useState } from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import DialogMaterial from "@material-ui/core/Dialog";
import Button from "designs/Button";
import { colors } from "common/styles/colors";

export * from "./components/DialogTitle";

interface IDialogProps {
  ButtonMenu: React.ReactElement;
  onConfirm?: () => void;
  onToggle?: (isOpen: boolean) => void;
  className?: string;
  size?: "sm" | "xs" | "md" | "lg" | "xl";
  onClose?: () => void;
  isForm?: boolean;
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
    isForm = true,
  } = props;
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
        aria-labelledby="customized-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={size}
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: colors.white,
          },
        }}
      >
        <ValidatorForm onSubmit={handleConfirm} className="p-2 phone:p-4">
          {children}
          <div
            id="dialog-actions"
            className="flex items-center justify-end gap-2 mt-3 phone:mt-4"
          >
            <Button
              className="text-primary"
              innerClassName="py-1 px-3 phone:px-6 h-4.5 border border-primary border-solid hover:bg-line"
              onClick={handleClose}
              type="button"
            >
              <span className="text-lg font-medium normal-case">Hủy</span>
            </Button>
            <Button
              primary
              innerClassName="py-1 px-3 phone:px-6 h-4.5 font-medium normal-case"
              type="submit"
            >
              <span className="text-lg font-medium normal-case">Lưu</span>
            </Button>
          </div>
        </ValidatorForm>
      </DialogMaterial>
    </>
  );
};

export default Dialog;
