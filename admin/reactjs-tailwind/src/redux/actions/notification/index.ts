import * as types from "redux/types/notification";
import { INotificationPayload } from "common/typings";

export const showNotification = (payload: INotificationPayload) => ({
  type: types.SHOW_NOTIFICATION,
  payload,
});
