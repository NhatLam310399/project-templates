import React from "react";
import Button from "designs/Button";
import Dialog from "@material-ui/core/Dialog";
import { colors } from "common/styles/colors";

interface IAlertDialogProps {
  ButtonMenu: React.ReactElement;
  title: string;
  content?: string | undefined;
  onConfirm?: (data: any) => void;
  data?: any;
  size?: "sm" | "xs" | "md" | "lg" | "xl";
  className?: string;
}

const AlertDialog: React.FC<IAlertDialogProps> = props => {
  const {
    ButtonMenu,
    title = "",
    content = "",
    onConfirm,
    data,
    size = "sm",
    className = "",
  } = props;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    onConfirm && onConfirm(data);
    setOpen(false);
  };

  return (
    <div className={className}>
      <button type="button" className="block w-full" onClick={handleClickOpen}>
        {ButtonMenu}
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
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
        <div className="p-2 phone:p-3">
          <h2
            id="dialog-title"
            className="mb-2 text-mxl font-bold text-black leading-none"
          >
            {title}
          </h2>
          <div id="dialog-content" className="mb-2 phone:mb-3">
            <div id="dialog-content-text" className="block text-black">
              {content}
            </div>
          </div>
          <div
            id="dialog-actions"
            className="flex justify-end items-center gap-2"
          >
            <Button
              secondary
              innerClassName="py-1 px-3 phone:px-4 h-4 font-medium normal-case text-primary"
              onClick={handleClose}
              type="button"
            >
              Hủy
            </Button>
            <Button
              primary
              innerClassName="py-1 px-2 phone:px-4 h-4 font-medium normal-case text-white"
              onClick={handleConfirm}
              type="submit"
            >
              Đồng ý
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
