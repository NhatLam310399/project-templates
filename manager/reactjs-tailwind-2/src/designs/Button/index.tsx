import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import ButtonUI from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Spinner from "designs/icons/Spinner";

interface IButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string;
  innerClassName?: string;
  loading?: boolean;
  primary?: boolean;
  secondary?: boolean;
  gradient?: boolean;
  error?: boolean;
  to?: string;
  isRounded?: boolean;
}

const primaryColor = "bg-primary hover:bg-primary-dark text-white";
const secondaryColor = "bg-white hover:bg-line text-black";
const gradientColor = "bg-gradient-to-b from-primary to-secondary text-white";
const errorColor = "bg-error hover:bg-error-dark text-white";

const Button: React.FC<IButtonProps> = props => {
  const history = useHistory();
  const {
    to,
    className = "",
    innerClassName = "",
    children,
    loading,
    secondary,
    primary,
    gradient,
    error,
    disabled,
    ...rest
  } = props;

  const handleClick = () => {
    if (to) {
      setTimeout(() => {
        history.push(to);
      }, 300);
    }
  };

  const buttonColor = error
    ? errorColor
    : gradient
    ? gradientColor
    : secondary
    ? secondaryColor
    : primaryColor;

  return (
    <div
      className={`button-wrapper ${
        (loading || disabled) && "opacity-40 pointer-events-none"
      } ${className}`}
    >
      <ButtonUI
        className="w-full"
        style={{
          padding: "0", // because padding is overwrite when use class
        }}
        fullWidth={false}
        onClick={handleClick}
        {...(rest as any)}
        disabled={disabled}
      >
        <div
          className={`py-1 flex items-center justify-center w-full leading-none ${buttonColor} ${innerClassName}`}
        >
          {loading && <Spinner className="mr-1" />}
          {children}
        </div>
      </ButtonUI>
    </div>
  );
};

export default Button;
