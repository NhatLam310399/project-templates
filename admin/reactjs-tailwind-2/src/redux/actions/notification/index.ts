import * as types from "redux/types/notification";
import { INotificationPayload } from "common/formatTypes";

export const showNotification = (payload: INotificationPayload) => ({
    type: types.SHOW_NOTIFICATION,
    payload,
});
