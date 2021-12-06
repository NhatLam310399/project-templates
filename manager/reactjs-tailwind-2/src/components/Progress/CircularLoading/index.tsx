import React from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  CircularProgress,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
    },
    bottom: {
      color: theme.palette.grey[theme.palette.type === "light" ? 400 : 700],
    },
    top: {
      animationDuration: "550ms",
      position: "absolute",
      left: 0,
    },
    circle: {
      strokeLinecap: "round",
    },
  }),
);

interface ICircularLoadingProps {
  size?: number;
  thickness?: number;
  className?: string;
}

const CircularLoading: React.FC<ICircularLoadingProps> = props => {
  const { size = 45, thickness = 4, className } = props;
  const classes = useStyles();

  return (
    <div className={`${classes.root} ${className}`}>
      <CircularProgress
        variant="determinate"
        className={classes.bottom}
        size={size}
        thickness={thickness}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={size}
        thickness={thickness}
      />
    </div>
  );
};

export default CircularLoading;
