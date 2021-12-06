import { useEffect } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "redux/reducers";
import { useToasts } from "react-toast-notifications";
import { INotificationPayload } from "common/typings";
import { notificationTitle } from "constants/notification";
import { messages } from "constants/messages";

export default function Notification() {
  const { payload } = useSelector((state: IRootState) => state.notification);
  const { addToast, removeAllToasts } = useToasts();

  useEffect(() => {
    if (!isEmptyObject(payload)) showNotification();
  }, [payload]);

  function showNotification() {
    let {
      type = "success",
      title = "",
      message = "",
    } = payload as INotificationPayload;

    if (!title) {
      title = notificationTitle[type];
    }

    removeAllToasts();
    addToast(renderNotification(title, formatMessage(message)), {
      appearance: type,
      autoDismiss: true,
    });
  }

  function renderNotification(title: string, message: string) {
    return (
      <div className=" my-auto py-1 w-full">
        <p className="text-lg font-bold">{title}</p>
        <p className="text-mds">{message}</p>
      </div>
    );
  }

  return <></>;
}

function isEmptyObject(obj: any) {
  if (obj && Object.keys(obj).length > 0) return false;
  return true;
}

const formatMessage = (message: string) => {
  const messageWithLanguage = messages.find(item => item.en === message);
  if (!messageWithLanguage) return message;
  return messageWithLanguage.vi;
};
