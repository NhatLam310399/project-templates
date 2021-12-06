import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/notificationApi";
import {
  createNotificationSaga,
  deleteNotificationByIdSaga,
  getAllNotificationSaga,
  updateNotificationSaga,
} from "./notification";

export default function* notificationSaga() {
  yield all([
    takeLatest(types.GET_ALL_NOTIFICATION, getAllNotificationSaga),
    takeLatest(types.CREATE_NOTIFICATION, createNotificationSaga),
    takeLatest(types.UPDATE_NOTIFICATION, updateNotificationSaga),
    takeLatest(types.DELETE_NOTIFICATION_BY_ID, deleteNotificationByIdSaga),
  ]);
}
