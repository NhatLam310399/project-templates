import React from "react";
import NoAvatar from "assets/images/no-avatar.jpg";
// import SkeletonAvatar from "assets/images/avatar.png";

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
                isRound ? `rounded-full` : `rounded-md`
            } ${className}`}
        >
            <img src={src || NoAvatar} alt="" className="h-full" />
        </div>
    );
};
export default Avatar;
