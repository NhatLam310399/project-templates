import React from "react";
import SVG from "designs/SVG";
import * as Icons from "designs/Icons";

interface INotificationProps {
    type?: "success" | "error" | "warning";
    text?: string;
    onClose?: () => void;
    onChange?: (value: string) => void;
}

const NotificationModal: React.FC<INotificationProps> = props => {
    const { type = "success", text = "", onClose } = props;

    const handleClose = () => {
        onClose && onClose();
    };
    return (
        <>
            <div className="fixed inset-x-0 inset-y-0 z-20 h-20 p-1 m-auto bg-white border-2 border-white rounded-lg w-50">
                <div className="absolute right-1">
                    <Icons.Close
                        onClick={handleClose}
                        className="font-bold fill-current"
                    />
                </div>
                <div className="flex items-center justify-center justify-items-center">
                    <div>
                        <SVG
                            className="w-5 h-5 mx-auto mt-4"
                            name={
                                type === "success"
                                    ? "notification/success"
                                    : type === "warning"
                                    ? "notification/warning"
                                    : "notification/error"
                            }
                        />
                        <p className="mt-3 text-xl font-medium text-center">
                            {text}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotificationModal;
