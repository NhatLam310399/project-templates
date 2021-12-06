import React from "react";
import SVG from "designs/SVG";

interface IErrorMessageProps {}

const ErrorMessage: React.FC<IErrorMessageProps> = props => {
  const { children } = props;
  return (
    <div className="text-sm text-error flex gap-x-0.2 items-center leading-none mt-0.5">
      <SVG name="common/error" width={14} height={14} />
      {children}
    </div>
  );
};

export default ErrorMessage;
