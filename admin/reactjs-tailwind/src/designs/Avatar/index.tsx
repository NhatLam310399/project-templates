import React from "react";
import SkeletonAvatar from "assets/svg/user/user-icon.svg";

export { SkeletonAvatar };

interface IAvatar {
  className?: string;
  src?: string;
  isRound?: boolean;
}

const Avatar: React.FC<IAvatar> = props => {
  const { className = "", src = "", isRound = false } = props;
  return (
    <div
      className={`w-4 h-4 overflow-hidden ${
        isRound ? `rounded-full` : ` rounded-md`
      } ${className}`}
    >
      <img
        src={src || SkeletonAvatar}
        alt=""
        className="block w-full h-full object-cover"
      />
    </div>
  );
};
export default Avatar;
