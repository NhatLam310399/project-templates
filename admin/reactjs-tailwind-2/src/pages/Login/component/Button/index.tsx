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
}

const DesignButton: React.FC<DesignButtonProps> = props => {
    const history = useHistory();
    const { to, className = "", children, ...rest } = props;

    const handleClick = () => {
        if (to) {
            setTimeout(() => {
                history.push(to);
            }, 300);
        }
    };
    return (
        <div
            className={`button-wrapper border-white border rounded-sm h-full ${className}`}
        >
            <Button
                className="w-full"
                style={{ padding: "0" }} // because padding is overwrite when use class
                onClick={handleClick}
                {...(rest as any)}
            >
                <div
                    className="flex items-center bg-primary font-sfpro text-lg phone:text-xl font-medium text-white justify-center 
                w-full leading-none rounded-md py-1.5"
                >
                    {children}
                </div>
            </Button>
        </div>
    );
};

export default DesignButton;
