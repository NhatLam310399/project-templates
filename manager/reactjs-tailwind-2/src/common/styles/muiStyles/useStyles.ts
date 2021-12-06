import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { colors } from "../colors";

export interface IFormStylesProps {
  showLabel?: boolean;
}

export const useFormStyles = makeStyles<Theme, IFormStylesProps>(theme => ({
  root: {
    "& .MuiOutlinedInput-root": {
      height: "48px",
    },
    "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
      paddingRight: "28px",
      maxWidth: "100%",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    "& .MuiOutlinedInput-input": {
      padding: "14px ",
    },
    "& .MuiInputLabel-outlined": {
      transform: "translate(14px, 15px) scale(1)",
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      transform: ({ showLabel }) =>
        `translate(14px, -6px) ${showLabel ? "scale(0.75)" : "scale(0)"}`,
    },
    "& .Mui-disabled": {
      backgroundColor: colors.line,
    },
  },
  inputFieldHidden: {
    display: "flex",
    "& .MuiInputBase-root": {
      display: "none",
    },
  },
  formHelperText: {
    color: theme.palette.error.main,
  },
  itemList: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chip: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#102B5C",
    color: "white",
    paddingTop: "3px",
    paddingBottom: "3px",
  },
}));

export const useDialogStyles = makeStyles({
  root: {
    "& .MuiDialog-paper": {
      padding: "0",
    },
    "& .MuiDialogTitle-root": {
      padding: "0",
    },
    "& .MuiDialogContent-root": {
      margin: "0",
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
    "& .MuiDialogActions-spacing > :not(:first-child)": {
      margin: "0",
    },
  },
});
