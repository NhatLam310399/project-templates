import React from "react";
import { AvatarContainer } from "./styles";
import SkeletonAvatar from "assets/images/avatar.png";

interface IAvatar {
  className?: string;
  src?: string;
  roundFull?: boolean;
}

const Avatar: React.FC<IAvatar> = props => {
  const { className = "", src = "", roundFull = false } = props;
  return (
    <AvatarContainer className={className} roundFull={roundFull}>
      <img src={src || SkeletonAvatar} alt="" width={40} height={40} />
    </AvatarContainer>
  );
};
export default Avatar;
