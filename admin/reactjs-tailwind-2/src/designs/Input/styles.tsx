import { makeStyles } from "@material-ui/core/styles";
import { colors } from "common/styles/colors";

export const useStyles = makeStyles({
    root: {
        "& .MuiOutlinedInput-input": {
            lineHeight: "1",
            padding: "14px 20px",
            height: "48px",
            boxSizing: "border-box",
            "&::placeholder": {
                color: "black",
                fontWeight: "normal",
            },
        },
        "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
            paddingRight: "28px",
            maxWidth: "100%",
            maxHeight: "calc(100% - 20px)",
            overflow: "hidden",
            transform: "translate(14px, 18px) scale(1)",
        },
        "& .MuiInputBase-root.Mui-disabled": {
            backgroundColor: colors.gray,
        },
    },
});
