import React from "react";

interface ITagProps {
  active: boolean;
  className?: string;
}

const Tag: React.FC<ITagProps> = props => {
  const { active, className, children } = props;
  return (
    <div
      className={`flex items-center justify-center w-max rounded-full px-1.5 py-0.5 ${
        active ? "bg-primary text-white " : "bg-line text-body"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Tag;
