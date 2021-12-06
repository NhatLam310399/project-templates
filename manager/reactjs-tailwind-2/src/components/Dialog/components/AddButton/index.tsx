import React from "react";

interface IAddButtonProps {
  children: React.ReactNode;
}

export const AddButton: React.FC<IAddButtonProps> = props => {
  const { children } = props;
  return (
    <div
      className="max-w-full min-w-17 flex items-center justify-center text-white bg-primary hover:bg-primary-dark
                 normal-case text-lg leading-none h-4.5 p-1 cursor-pointer"
    >
      {children}
    </div>
  );
};
