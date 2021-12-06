import cn from "classnames";
import CSS from "csstype";

interface IArrowIcon {
  direction: "DOWN" | "UP" | "LEFT" | "RIGHT";
  style?: CSS.Properties;
  className?: string;
  color?: string;
}

const DEG_ROTATE = {
  DOWN: 0,
  UP: 180,
  LEFT: 90,
  RIGHT: 270,
};

export default function ArrowIcon(props: IArrowIcon) {
  const {
    className = "",
    direction = "DOWN",
    style = {},
    color = "black",
  } = props;

  return (
    <svg
      className={cn("arrow-icon icon", className)}
      style={{
        transform: `rotate(${DEG_ROTATE[direction]}deg)`,
        transition: "0.3s",
        ...style,
      }}
      viewBox={`0 0 16 9`}
      fill="black"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8.6741e-05 1.05731C8.67521e-05 0.786824 0.103066 0.516335 0.308111 0.309571C0.718657 -0.103039 1.38346 -0.103039 1.79446 0.309572L7.66512 6.21632L13.5376 0.309114C13.9486 -0.103496 14.6134 -0.102579 15.0244 0.309114C15.4336 0.723558 15.4336 1.39244 15.0244 1.80597L8.4083 8.46092C7.99775 8.87215 7.3325 8.87215 6.92195 8.46092L0.308111 1.80597C0.103066 1.59921 8.67299e-05 1.32872 8.6741e-05 1.05731Z" />
    </svg>
  );
}
