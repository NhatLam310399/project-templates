import React from "react";

interface IDialogTitle {
  children: React.ReactChild;
  className?: string;
}

export const AddButton: React.FC<IDialogTitle> = props => {
  const { className = "", children } = props;
  return (
    <div
      className={`w-full min-w-17 flex justify-center items-center h-4.5 py-1 px-2 text-lg font-medium 
      text-white text-center bg-primary hover:bg-primary-dark rounded ${className}`}
    >
      {children}
    </div>
  );
};
