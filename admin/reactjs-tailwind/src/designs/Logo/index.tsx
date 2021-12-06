import React from "react";
import SkeletonLogo from "assets/images/default/avatar-default.jpg";

export { SkeletonLogo };
interface ILogoProps {
  className?: string;
  src?: string;
  isRound?: boolean;
}

const Logo: React.FC<ILogoProps> = props => {
  const { className = "", src = "", isRound = false } = props;
  return (
    <div
      className={`w-6 h-6 overflow-hidden ${
        isRound ? "rounded-full" : ""
      } ${className}`}
    >
      <img
        src={src || SkeletonLogo}
        alt=""
        className="block object-cover w-full h-full"
      />
    </div>
  );
};
export default Logo;
