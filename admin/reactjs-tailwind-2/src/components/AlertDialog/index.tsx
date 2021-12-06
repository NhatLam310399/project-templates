import React from "react";
import Button from "designs/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { colors } from "common/styles/colors";

interface IAlertDialogProps {
    ButtonMenu: React.ReactElement;
    title: string;
    content?: string | undefined;
    onConfirm?: (data: any) => void;
    data?: any;
    className?: string;
    note?: string;
}

const AlertDialog: React.FC<IAlertDialogProps> = props => {
    const {
        ButtonMenu,
        title = "",
        content = "",
        onConfirm,
        data,
        className = "",
        note = "",
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
        <div className={`${className}`}>
            <button
                type="button"
                className="block w-full"
                onClick={handleClickOpen}
            >
                {ButtonMenu}
            </button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    style: {
                        backgroundColor: colors.white,
                        borderRadius: "0px",
                        padding: "40px",
                    },
                }}
            >
                <DialogTitle className="p-0 mb-2" id="alert-dialog-title">
                    <h1 className="font-bold leading-none text-xxl font-sfpro">
                        {title}
                    </h1>
                </DialogTitle>
                <DialogContent className="p-0 mb-3">
                    <DialogContentText id="alert-dialog-description">
                        <span className="block text-lg leading-none text-black font-sfpro">
                            {content}
                        </span>
                    </DialogContentText>
                </DialogContent>
                <DialogActions className="flex flex-col w-full gap-2 p-0 phone:flex-row">
                    <Button
                        className="w-full phone:w-auto"
                        innerClassName="py-1 px-3.5 h-4 font-normal normal-case border-none"
                        onClick={handleClose}
                        type="button"
                    >
                        Huỷ bỏ
                    </Button>
                    <Button
                        className="w-full phone:w-auto"
                        primary
                        innerClassName="py-1 px-3.5 h-4 font-normal normal-case"
                        onClick={handleConfirm}
                        type="submit"
                    >
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AlertDialog;
