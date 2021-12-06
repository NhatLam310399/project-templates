import { IGraphQLResponse } from "@common/typings";
import { call, put } from "@redux-saga/core/effects";
import * as services from "@services/notification";
import {
  getNotificationsByUserSuccess,
  getNotificationsSettingSuccess,
} from "@redux/actions/notification";

export function* getNotifications(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.getNotificationByUser,
    variables,
  );
  const { getNotifyByUser: results } = response?.data || {};
  if (results) {
    yield put(getNotificationsByUserSuccess(results));
  }
}

export function* setSeenForNotify(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.setSeenForNotify,
    variables,
  );
  const { setSeenForNotify: results } = response?.data || {};
  if (results) {
  }
}

export function* getNotificationsSetting(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.getNotificationSetting,
    variables,
  );
  const { getAllNotifySetting: results } = response?.data || {};
  if (results) {
    yield put(getNotificationsSettingSuccess(results));
  }
}
