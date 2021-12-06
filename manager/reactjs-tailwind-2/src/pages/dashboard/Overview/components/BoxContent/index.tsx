import React from "react";
import { IIconSVGProps } from "common/typings/App";

interface IBoxContentProps {
  icons: IIconSVGProps;
  title: string;
  amount?: number | string;
  className?: string;
}

const BoxContent: React.FC<IBoxContentProps> = props => {
  const { amount, icons, title, className } = props;
  return (
    <div
      className={`box-content rounded-lg bg-line flex items-center gap-2.5 p-2.5 ${className}`}
    >
      <div className="flex-none">{icons}</div>
      <div className="flex-1">
        <p className="font-bold text-lg leading-none text-black mb-1">
          {title}
        </p>
        <p className="font-bold text-xl text-primary leading-none">{amount}</p>
      </div>
    </div>
  );
};
export default BoxContent;
