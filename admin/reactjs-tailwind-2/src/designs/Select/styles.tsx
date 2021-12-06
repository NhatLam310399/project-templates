import { makeStyles } from "@material-ui/core/styles";
import { colors } from "common/styles/colors";

export const useStyles = makeStyles({
    root: {
        "& .MuiOutlinedInput-input": {
            lineHeight: "1",
            padding: "14px",
            paddingLeft: "20px",
            height: "48px",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
        },
        "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
            paddingRight: "28px",
            maxWidth: "100%",
            maxHeight: "calc(100% - 18px)",
            overflow: "hidden",
            transform: "translate(14px, 18px) scale(1)",
        },
    },
    inputFieldHidden: {
        opacity: 0,
        position: "absolute",
    },
    selectItem: {
        borderBottom: "1px solid #F7F8FB",
    },
});
