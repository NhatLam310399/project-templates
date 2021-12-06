import { makeStyles } from "@material-ui/core/styles";
import { colors } from "common/styles/colors";

export const useStyles = makeStyles({
    root: {
        "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
            paddingRight: "28px",
            maxWidth: "100%",
            maxHeight: "calc(100% - 20px)",
            overflow: "hidden",
        },
    },
    inputFieldHidden: {
        opacity: 0,
        position: "absolute",
    },
    formHelperText: {
        color: colors.success,
        margin: "0 14px",
        marginTop: "3px",
    },
    customHoverDelete: {
        "& .delete": {
            opacity: 0,
        },
        "&:hover": {
            "& .delete": {
                opacity: 1,
            },
        },
    },
});
