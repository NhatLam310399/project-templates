import { makeStyles } from "@material-ui/core/styles";
import { colors } from "common/styles/colors";

export const useStyles = makeStyles({
    root: {
        "& .MuiOutlinedInput-root": {
            lineHeight: "1",
            padding: "14px 20px",
            height: "48px",
            boxSizing: "border-box",
        },
        "& .MuiInputBase-input": {
            lineHeight: "1",
            padding: "0 !important",
            fontSize: "13px",
        },
        "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
            paddingRight: "28px",
            maxWidth: "100%",
            maxHeight: "calc(100% - 20px)",
            overflow: "hidden",
            fontSize: "13px",
            transform: "translate(14px, 18px) scale(1)",
        },
        "& .MuiInputBase-root.Mui-disabled": {
            backgroundColor: colors.gray,
        },
        "& fieldset legend": {
            width: "auto",
        },
    },
});
