import React, { Fragment, useEffect } from "react";
import { INotificationPayload } from "@common/typings";
import { toast, ToastOptions } from "react-toastify";
export * from "./styles";
import { IconWrapper, Icon, Content, Title, Message } from "./styles";
import { notificationMapping } from "@constants/notification";
interface IToastNotification {
  payload: INotificationPayload;
}

const ToastNotification: React.FC<IToastNotification> = (props) => {
  const { title, message, type } = props.payload || {};

  useEffect(() => {}, []);
  const renderIcon = () => {
    if (type === "success") {
      return (
        <Fragment>
          <IconWrapper>
            <Icon name="common/checked-white" width="15px" height="15px" />
          </IconWrapper>
          <Content>
            {title ? <Title>{title}</Title> : ""}
            <Message>{message}</Message>
          </Content>
        </Fragment>
      );
    }
    if (type === ("error" || "warning")) {
      return (
        <Fragment>
          <IconWrapper>
            <Icon name="common/error-white" width="15px" height="15px" />
          </IconWrapper>
          <Content>
            {title ? <Title>{title}</Title> : ""}
            <Message>{notificationMapping(message)}</Message>
          </Content>
        </Fragment>
      );
    }
    return null;
  };

  return <>{renderIcon()}</>;
};

export const toastOptions: ToastOptions = {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  toastId: "toast-notification",
};

export const showNotification = (payload: INotificationPayload) => {
  const { type } = payload;
  toast(<ToastNotification payload={payload} />, { ...toastOptions, type });
};
