import { call, put } from "redux-saga/effects";
import { actionSuccess, setLoading } from "redux/actions/common";
import { IGraphQLResponse } from "common/typings/App";
import { showNotification } from "redux/actions/notification";
import { getAllClosingTimeSuccess } from "redux/actions/closingTime";
import * as services from "services/closingTime";

export function* getAllClosingTimeSaga(payload: any) {
  const variable = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getAllClosingTime,
    variable,
  );

  yield put(setLoading(false));
  const { getAllClosingTime: result } = response.data || {};
  if (result) {
    yield put(getAllClosingTimeSuccess(result));
  }
}

export function* createClosingTimeSaga(payload: any) {
  const variable = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.createClosingTime,
    variable,
  );
  yield put(setLoading(false));
  const { createClosingTime: result } = response.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        title: "Thêm mới thành công",
        message: "",
      }),
    );
  }
}

export function* updateClosingTimeSaga(payload: any) {
  const variable = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.updateClosingTime,
    variable,
  );
  yield put(setLoading(false));
  const { updateClosingTime: result } = response.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        title: "Cập nhật thành công",
        message: "",
      }),
    );
  }
}

export function* deleteClosingTimeByIdSaga(payload: any) {
  const variable = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.deleteClosingTimeById,
    variable,
  );
  yield put(setLoading(false));
  const { deleteClosingTimeById: result } = response.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        title: "Xóa thành công",
        message: "",
      }),
    );
  }
}
