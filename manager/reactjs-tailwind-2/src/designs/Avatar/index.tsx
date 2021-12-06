import React from "react";
import SkeletonAvatar from "assets/images/avatar.jpg";

export { SkeletonAvatar };
interface IAvatar {
  className?: string;
  src?: string;
  alt?: string;
  isRound?: boolean;
}

const Avatar: React.FC<IAvatar> = props => {
  const { className = "", src = "", isRound = true, alt = "Hình ảnh" } = props;
  return (
    <div
      className={`w-4 h-4 overflow-hidden ${
        isRound ? `rounded-full` : ``
      } ${className}`}
    >
      <img src={src || SkeletonAvatar} alt={alt} />
    </div>
  );
};
export default Avatar;
