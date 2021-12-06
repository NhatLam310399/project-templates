import React from "react";

interface IRatingProps {
    className?: string;
}

const Rating: React.FC<IRatingProps> = props => {
    const { className, children } = props;
    return (
        <div
            className={`px-1 py-0.5 text-secondary border border-secondary flex items-center justify-center w-max rounded ${className}`}
        >
            {children}
        </div>
    );
};

export default Rating;
