import { makeStyles, Button, Tooltip } from "@material-ui/core";

import SVG from "designs/SVG";

interface IIConButton {
    svgName: string;
    className?: string;
    title?: string;
    onClick?: () => void;
}

const IconButton: React.FC<IIConButton> = props => {
    const { className = "", title = "", svgName = "", onClick } = props;
    const classes = useStyles();

    return (
        <div className={className} onClick={onClick}>
            <Tooltip
                title={title}
                arrow
                disableFocusListener
                disableTouchListener
            >
                <Button className={classes.root}>
                    <SVG name={svgName} />
                </Button>
            </Tooltip>
        </div>
    );
};

export default IconButton;

const useStyles = makeStyles({
    root: {
        padding: "0px",
        borderRadius: "99px",
        minWidth: "0",
    },
});
