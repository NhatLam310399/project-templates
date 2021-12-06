import { createStyles, makeStyles, Theme } from "@material-ui/core";
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
}));
