import React from "react";

interface ITabTitleProps {
  isActive: boolean;
  onChange: () => void;
  className?: string;
}
const TabTitle: React.FC<ITabTitleProps> = props => {
  const { onChange, isActive, className, children } = props;
  const onClickHandler = () => {
    onChange();
  };
  return (
    <button
      type="button"
      className={`duration-100 block w-full text-left py-1.5 px-2 text-lg leading-none ${className}
      ${
        isActive ? "bg-primary text-white" : "bg-white text-black hover:bg-line"
      }
      `}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
};
export default TabTitle;
