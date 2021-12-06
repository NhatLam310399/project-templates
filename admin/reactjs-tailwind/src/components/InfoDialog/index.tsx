import React from "react";
import Button from "designs/Button";
import Dialog from "@material-ui/core/Dialog";
import { colors } from "common/styles/colors";

interface IInfoDialogProps {
  ButtonMenu: React.ReactElement;
  title?: string;
  children?: React.ReactChild;
  className?: string;
  size?: "sm" | "xs" | "md" | "lg" | "xl";
}

const InfoDialog: React.FC<IInfoDialogProps> = props => {
  const { ButtonMenu, title, className = "", size = "md", children } = props;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
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
            padding: 0,
          },
        }}
      >
        <div className="p-2 phone:p-4">
          {title && (
            <div id="dialog-title">
              <h1 className="text-mxl font-bold text-black">{title}</h1>
            </div>
          )}
          <div id="dialog-description">{children}</div>
          <div id="dialog-actions" className="mt-2 phone:mt-4 overflow-hidden">
            <Button
              className="w-max float-right"
              innerClassName="py-1 px-5 h-4.5 font-medium normal-case"
              onClick={handleClose}
              type="button"
              primary
            >
              Đóng
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default InfoDialog;
