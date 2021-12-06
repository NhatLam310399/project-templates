import React from "react";
import { IIconSVGProps } from "common/typings";

const EmailIcon: React.FC<IIconSVGProps> = props => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.666 15H14.9993V7.70837L9.99935 10.8334L4.99935 7.70837V15H3.33268V5.00004H4.33268L9.99935 8.54171L15.666 5.00004H16.666V15ZM16.666 3.33337H3.33268C2.40768 3.33337 1.66602 4.07504 1.66602 5.00004V15C1.66602 15.4421 1.84161 15.866 2.15417 16.1785C2.46673 16.4911 2.89065 16.6667 3.33268 16.6667H16.666C17.108 16.6667 17.532 16.4911 17.8445 16.1785C18.1571 15.866 18.3327 15.4421 18.3327 15V5.00004C18.3327 4.55801 18.1571 4.13409 17.8445 3.82153C17.532 3.50897 17.108 3.33337 16.666 3.33337Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default EmailIcon;
