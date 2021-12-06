import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

interface DesignButtonProps
    extends DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    className?: string;
    to?: string;
    primary?: boolean;
}

const DesignButton: React.FC<DesignButtonProps> = props => {
    const history = useHistory();
    const { to, className = "", primary, children, ...rest } = props;

    const handleClick = () => {
        if (to) {
            setTimeout(() => {
                history.push(to);
            }, 300);
        }
    };
    return (
        <div
            className={`flex justify-center items-center cursor-pointer ${className}`}
        >
            <Button
                className="h-full w-full"
                style={{ padding: "0" }} // because padding is overwrite when use class
                onClick={handleClick}
                {...(rest as any)}
            >
                <div
                    className={`flex items-center font-sfpro text-lg font-medium justify-center 
                    w-full h-full leading-none normal-case ${
                        primary ? "text-white" : "text-primary"
                    }`}
                >
                    {children}
                </div>
            </Button>
        </div>
    );
};

export default DesignButton;
