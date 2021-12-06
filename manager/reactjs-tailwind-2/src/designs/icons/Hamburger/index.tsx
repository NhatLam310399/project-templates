import React from "react";
import { IIconSVGProps } from "common/typings";

const HamburgerIcon: React.FC<IIconSVGProps> = props => {
  return (
    <svg
      {...props}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.33333 24H22.6667C23.4 24 24 23.1 24 22C24 20.9 23.4 20 22.6667 20H1.33333C0.6 20 0 20.9 0 22C0 23.1 0.6 24 1.33333 24ZM1.33333 14H22.6667C23.4 14 24 13.1 24 12C24 10.9 23.4 10 22.6667 10H1.33333C0.6 10 0 10.9 0 12C0 13.1 0.6 14 1.33333 14ZM0 2C0 3.1 0.6 4 1.33333 4H22.6667C23.4 4 24 3.1 24 2C24 0.9 23.4 0 22.6667 0H1.33333C0.6 0 0 0.9 0 2Z"
        fill="current-color"
      />
    </svg>
  );
};

export default HamburgerIcon;
