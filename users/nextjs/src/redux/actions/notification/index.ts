import {
  IGetNotificationByUser,
  ISetSeenForNotify,
  IGetNotificationSetting,
} from "@common/typings";
import * as types from "@redux/types/notification";
export const getNotificationsByUser = (payload: IGetNotificationByUser) => ({
  type: types.GET_NOTIFICATIONS_BY_USER,
  payload,
});
export const getNotificationsByUserSuccess = <T>(payload: T) => ({
  type: types.GET_NOTIFICATIONS_BY_USER_SUCCESS,
  payload,
});

export const getNotificationsSetting = (payload: IGetNotificationSetting) => ({
  type: types.GET_NOTIFICATIONS_SETTING,
  payload,
});
export const getNotificationsSettingSuccess = <T>(payload: T) => ({
  type: types.GET_NOTIFICATIONS_SETTING_SUCCESS,
  payload,
});

export const setSeenForNotify = (payload: ISetSeenForNotify) => ({
  type: types.SET_SEEN_FOR_NOTIFY,
  payload,
});
