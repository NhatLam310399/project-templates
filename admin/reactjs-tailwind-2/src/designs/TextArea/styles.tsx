import { makeStyles } from "@material-ui/core/styles";
import { colors } from "common/styles/colors";

export const useStyles = makeStyles({
    inputFieldHidden: {
        opacity: 0,
        position: "absolute",
    },
    formHelperText: {
        color: colors.error,
    },
});
