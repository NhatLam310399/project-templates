import React from "react";

interface IUserFormWrapperProps {
    title?: string;
}
const UserFormWrapper: React.FC<IUserFormWrapperProps> = ({
    title,
    children,
}) => {
    return (
        <div className="w-full m-auto">
            <h1 className="mb-2 font-bold text-xxl">{title}</h1>
            {children}
        </div>
    );
};

export default UserFormWrapper;
