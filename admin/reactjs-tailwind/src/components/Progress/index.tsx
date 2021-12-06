import React from "react";
import { useSelector } from "react-redux";
import { IRootState } from "redux/reducers";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import CircularLoading from "./CircularLoading";

const useStyles = makeStyles({
  container: {
    zIndex: 9999,
    position: "fixed",
    maxWidth: "100vw",
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    pointerEvents: "none",
  },
});

const Progress: React.FC = () => {
  const { isLoading } = useSelector((state: IRootState) => state.common);

  const classes = useStyles();
  return isLoading ? (
    <Container
      classes={{ root: classes.container }}
      disableGutters
      className="z-sky"
    >
      <CircularLoading />
    </Container>
  ) : null;
};

export default Progress;
