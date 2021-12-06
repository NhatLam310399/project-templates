import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

interface DesignButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string;
  innerClassName?: string;
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  to?: string;
}

const primaryColor = "bg-primary hover:bg-primary-dark text-white";
const secondaryColor = "bg-white hover:bg-line text-black";
const tertiaryColor = "bg-tertiary hover:bg-white text-black";

const DesignButton: React.FC<DesignButtonProps> = props => {
  const history = useHistory();
  const {
    to,
    className = "",
    innerClassName = "",
    children,
    primary,
    tertiary,
    disabled,

    ...rest
  } = props;
  let { secondary } = props;
  const handleClick = () => {
    if (to) {
      setTimeout(() => {
        history.push(to || "#");
      }, 300);
    }
  };

  if (!primary && !tertiary) secondary = true;

  const buttonColor = primary
    ? primaryColor
    : secondary
    ? secondaryColor
    : tertiary
    ? tertiaryColor
    : "";

  return (
    <div className={`button-wrapper h-full ${className}`}>
      <Button
        className="w-full"
        style={{ padding: "0" }}
        onClick={handleClick}
        disabled={disabled}
        {...(rest as any)}
      >
        <div
          className={`flex items-center text-lg font-medium justify-center w-full leading-none rounded-md p-1.3 ${innerClassName}
          ${buttonColor}
          ${disabled && "opacity-40"}`}
        >
          {children}
        </div>
      </Button>
    </div>
  );
};

export default DesignButton;
