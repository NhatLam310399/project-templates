import React from "react";
import cn from "classnames";

interface IArrowIcon {
    direction: "DOWN" | "UP" | "LEFT" | "RIGHT";
    style?: React.CSSProperties;
    className?: string;
}

const DEG_ROTATE = {
    DOWN: 0,
    UP: 180,
    LEFT: 90,
    RIGHT: 270,
};

export default function ArrowIcon(props: IArrowIcon) {
    const { className = "", direction = "DOWN", style = {} } = props;

    return (
        <svg
            className={cn("arrow-icon icon", className)}
            style={{
                transform: `rotate(${DEG_ROTATE[direction]}deg)`,
                transition: "0.3s",
                ...style,
            }}
            width="12"
            height="6"
            viewBox="0 0 12 6"
            fill="#E0E0E0"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M0.979943 0.313439C1.15745 0.135928 1.43523 0.11979 1.63097 0.265027L1.68705 0.313439L6.00016 4.62633L10.3133 0.313439C10.4908 0.135928 10.7686 0.11979 10.9643 0.265027L11.0204 0.313439C11.1979 0.49095 11.214 0.768726 11.0688 0.964467L11.0204 1.02055L6.35372 5.68721C6.17621 5.86472 5.89843 5.88086 5.70269 5.73562L5.64661 5.68721L0.979943 1.02055C0.784681 0.825283 0.784681 0.508701 0.979943 0.313439Z" />
        </svg>
    );
}
