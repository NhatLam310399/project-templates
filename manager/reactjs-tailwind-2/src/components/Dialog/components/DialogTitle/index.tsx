import React, { HTMLAttributes, DetailedHTMLProps } from "react";

interface IDialogTitle
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  className?: string;
}

export const DialogTitle: React.FC<IDialogTitle> = props => {
  const { className = "", children, ...rest } = props;
  return (
    <h1
      className={`text-primary text-xl font-bold uppercase ${className}`}
      {...rest}
    >
      {children}
    </h1>
  );
};
