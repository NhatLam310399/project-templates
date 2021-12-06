import React from "react";

interface ITagRatingProps {
    className?: string;
}

const TagRating: React.FC<ITagRatingProps> = props => {
    const { className, children } = props;
    return (
        <div
            className={`flex items-center bg-pink justify-center px-2.5 w-20 py-0.5 text-white ${className}`}
        >
            {children}
        </div>
    );
};

export default TagRating;
