import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/typings";
import { showNotification } from "redux/actions/notification";
import { actionSuccess, setLoading } from "redux/actions/common";
import { getAllNotificationSuccess } from "redux/actions/notificationApi";
import * as services from "services/notification";

export function* getAllNotificationSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getAllNotification,
    variables,
  );
  yield put(setLoading(false));

  const { getAllNotification: result } = response?.data || {};
  if (result) {
    yield put(getAllNotificationSuccess(result));
  }
}

export function* createNotificationSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.createNotification,
    variables,
  );
  yield put(setLoading(false));

  const { createNotification: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        message: "Thêm mới thành công",
      }),
    );
  }
}

export function* updateNotificationSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.updateNotification,
    variables,
  );
  yield put(setLoading(false));

  const { updateNotification: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        message: "Cập nhật thành công",
      }),
    );
  }
}

export function* deleteNotificationByIdSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.deleteNotificationById,
    variables,
  );
  yield put(setLoading(false));

  const { deleteNotificationById: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        message: "Xóa hành công",
      }),
    );
  }
}
