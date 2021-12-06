import React, { cloneElement, useState, useEffect } from "react";
import DialogMaterial from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "designs/Button";
import { colors } from "common/styles/colors";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { makeStyles } from "@material-ui/core/styles";

export * from "./components/DialogTitle";
// import { SELECT_REQUIRE_VALIDATE_NAME } from "designs/Select";
// import { randomId } from "common/functions";

interface IDialogProps {
    ButtonMenu: React.ReactElement;
    onConfirm?: () => void;
    onToggle?: (isOpen: boolean) => void;
    className?: string;
    size?: "sm" | "xs" | "md" | "lg" | "xl";
    onClose?: () => void;
    isDialogView?: boolean;
}

const useStyles = makeStyles({
    root: {
        padding: "20px",
        "@media (min-width:600px)": {
            padding: "40px",
        },
    },
});

const Dialog: React.FC<IDialogProps> = props => {
    const {
        ButtonMenu,
        children,
        onConfirm,
        onClose,
        onToggle,
        className = "",
        size = "sm",
        isDialogView,
    } = props;
    const classes = useStyles();

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
            <div className={`${className}`}>
                <button
                    type="button"
                    className="flex-1 block w-full"
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
                        overflowX: "hidden",
                    },

                    classes: {
                        root: classes.root,
                    },
                }}
            >
                <ValidatorForm onSubmit={handleConfirm} className="font-sfpro">
                    {children}
                    {isDialogView ? (
                        <DialogActions className="flex flex-col items-center gap-2 p-0 mt-3 phone:flex-row phone:justify-end">
                            <Button
                                className="w-full phone:w-auto"
                                innerClassName="py-1 px-6 h-4 font-semibold normal-case"
                                onClick={handleClose}
                                type="button"
                                primary
                            >
                                Đóng
                            </Button>
                        </DialogActions>
                    ) : (
                        <DialogActions className="flex flex-col items-center gap-2 p-0 mt-5 phone:flex-row phone:justify-end">
                            <Button
                                className="w-full phone:w-auto"
                                innerClassName="py-1 px-3.5 h-4 font-semibold normal-case"
                                onClick={handleClose}
                                type="button"
                            >
                                Huỷ bỏ
                            </Button>
                            <Button
                                className="w-full ml-0 phone:w-auto"
                                primary
                                innerClassName="py-1 px-5 h-4 font-medium normal-case"
                                type="submit"
                            >
                                Đồng ý
                            </Button>
                        </DialogActions>
                    )}
                </ValidatorForm>
            </DialogMaterial>
        </>
    );
};

export default Dialog;
