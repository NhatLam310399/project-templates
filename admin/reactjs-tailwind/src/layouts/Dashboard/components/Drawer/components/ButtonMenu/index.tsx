import React from "react";

const ButtonMenu: React.FC<{
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
}> = props => {
  const { active, children, onClick, disabled = false } = props;
  return (
    <button
      type="button"
      className={`block w-full p-1 text-left leading-none font-medium rounded-lg disabled:cursor-default ${
        active
          ? "bg-tertiary text-primary"
          : "text-black hover:text-primary-light"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonMenu;
