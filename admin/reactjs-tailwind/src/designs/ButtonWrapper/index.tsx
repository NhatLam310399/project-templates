import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";

interface IButtonWrapperProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
}

const ButtonWrapper: React.FC<IButtonWrapperProps> = props => {
  const { children, className = "", ...rest } = props;
  const classes = useStyle();
  return (
    <div className={`w-full rounded ${className}`} {...rest}>
      <Button className={classes.root}>{children}</Button>
    </div>
  );
};

export default ButtonWrapper;

const useStyle = makeStyles({
  root: {
    padding: "0 5px",
    textTransform: "none",
    width: "100%",
    justifyContent: "left",
    textAlign: "left",
  },
});
