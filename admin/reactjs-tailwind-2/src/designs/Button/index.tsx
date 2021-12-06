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
    to?: string;
}

const primaryColor = "bg-primary text-white";
const secondaryColor = "bg-lightGray text-black border border-primary ";

const DesignButton: React.FC<DesignButtonProps> = props => {
    const history = useHistory();
    const {
        to,
        className = "",
        innerClassName = "",
        children,
        primary,
        ...rest
    } = props;

    const handleClick = () => {
        if (to) {
            setTimeout(() => {
                history.push(to);
            }, 300);
        }
    };
    return (
        <div className={`button-wrapper ${className}`}>
            <Button
                className="w-full"
                style={{ padding: "0" }} // because padding is overwrite when use class
                onClick={handleClick}
                {...(rest as any)}
            >
                <div
                    className={`flex items-center justify-center w-full leading-none py-1 h-4.5 ${innerClassName} ${
                        !primary ? secondaryColor : primaryColor
                    }`}
                >
                    {children}
                </div>
            </Button>
        </div>
    );
};

export default DesignButton;
