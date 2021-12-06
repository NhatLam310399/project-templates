import { makeStyles } from "@material-ui/core/styles";
import { colors } from "common/styles/colors";

export const useStyles = makeStyles({
    root: {},
    layout: {
        gridTemplateColumns: "1fr 1fr",
        gridColumnGap: "20px",
    },
    layoutLeft: {},
    layoutRight: {},
    layoutBottom: {
        gridColumnStart: "1",
        gridColumnEnd: "3",
    },
});
