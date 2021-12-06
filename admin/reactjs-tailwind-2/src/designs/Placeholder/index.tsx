import * as React from "react";
import { useStyles } from "./styles";
import { IPlaceholderProps } from "./interface";

const Placeholder: React.FC<IPlaceholderProps> = ({ children }) => {
    const classes = useStyles();
    return <div className={classes.placeholder}>{children}</div>;
};

export default Placeholder;
