import * as types from "redux/types/notificationApi";
import {
  IById,
  ICreateNotification,
  IGetAllNotification,
  IUpdateNotification,
} from "common/typings";

export const getAllNotification = (payload: IGetAllNotification) => ({
  type: types.GET_ALL_NOTIFICATION,
  payload,
});

export const getAllNotificationSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_NOTIFICATION_SUCCESS,
  payload,
});

export const createNotification = (payload: ICreateNotification) => ({
  type: types.CREATE_NOTIFICATION,
  payload,
});
export const updateNotification = (payload: IUpdateNotification) => ({
  type: types.UPDATE_NOTIFICATION,
  payload,
});
export const deleteNotificationById = (payload: IById) => ({
  type: types.DELETE_NOTIFICATION_BY_ID,
  payload,
});
