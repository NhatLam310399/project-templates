import { all, takeLatest } from "@redux-saga/core/effects";
import * as types from "@redux/types/notification";
import {
  getNotifications,
  setSeenForNotify,
  getNotificationsSetting,
} from "./notifications";

export default function* notify() {
  yield all([
    takeLatest(types.GET_NOTIFICATIONS_BY_USER, getNotifications),
    takeLatest(types.SET_SEEN_FOR_NOTIFY, setSeenForNotify),
    takeLatest(types.GET_NOTIFICATIONS_SETTING, getNotificationsSetting),
  ]);
}
