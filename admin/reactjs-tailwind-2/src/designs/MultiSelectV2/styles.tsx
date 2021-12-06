import { makeStyles } from "@material-ui/core/styles";
import { colors } from "common/styles/colors";

export const useStyles = makeStyles({
    root: {
        "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
            paddingRight: "28px",
            maxWidth: "100%",
            maxHeight: "calc(100% - 20px)",
            overflow: "hidden",
            // backgroundColor: colors.white,
        },
        "& .MuiInputBase-root": {
            // minHeight: "56px",
        },
    },
    inputFieldHidden: {
        opacity: 0,
        position: "absolute",
    },
    chip: {
        display: "flex",
        alignItems: "center",
        // backgroundColor: colors.primary,
        color: "white",
        paddingTop: "3px",
        paddingBottom: "3px",
    },
});
