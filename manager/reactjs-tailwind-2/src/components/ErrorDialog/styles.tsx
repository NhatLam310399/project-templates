import { makeStyles } from "@material-ui/core/styles";
import { colors } from "common/styles/colors";

export const useStyles = makeStyles({
  root: {
    "& .MuiDialog-paper": {
      padding: "20px",
    },
    "& .MuiDialogTitle-root": {
      padding: "0",
    },
    "& .MuiDialogContent-root": {
      margin: "20px 0 30px 0",
      padding: "0",
    },
    "& .MuiDialogContentText-root": {
      padding: "0",
      margin: "0",
    },
    "& .MuiDialogActions-root": {
      padding: "0",
      justifyContent: "flex-end",
    },
    "& .MuiButton-containedPrimary": {
      backgroundColor: `${colors.primary}`,
    },
    "& .MuiButton-outlinedPrimary": {
      color: `${colors.primary}`,
      border: `1px solid ${colors.primary}`,
    },
  },
});
