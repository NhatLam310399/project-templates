import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useNProgress } from "@tanem/react-nprogress";
import React from "react";
import { useSelector } from "react-redux";
import { IRootState } from "redux/reducers";

const useStyles = makeStyles<
    Theme,
    Pick<ReturnType<typeof useNProgress>, "animationDuration" | "isFinished">
>({
    bar: ({ animationDuration }) => ({
        transitionDuration: `${animationDuration}ms`,
    }),
    container: ({ animationDuration, isFinished }) => ({
        position: "fixed",
        maxWidth: "100vw",
        width: "100vw",
        opacity: isFinished ? 0 : 1,
        pointerEvents: "none",
        transition: `opacity ${animationDuration}ms linear`,
    }),
});

const Progress: React.FC = () => {
    const { isLoading } = useSelector((state: IRootState) => state.common);
    const { animationDuration, isFinished, progress } = useNProgress({
        isAnimating: isLoading,
    });

    const classes = useStyles({ animationDuration, isFinished });

    return (
        <Container
            classes={{ root: classes.container }}
            disableGutters={true}
            className="z-50"
        >
            <LinearProgress
                classes={{ bar1Determinate: classes.bar }}
                value={progress * 100}
                variant="determinate"
            />
        </Container>
    );
};

export default Progress;
