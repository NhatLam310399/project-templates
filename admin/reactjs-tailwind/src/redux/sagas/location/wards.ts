import { call, put } from "redux-saga/effects";
import { setLoading, actionSuccess } from "redux/actions/common";
import { getWardsSuccess } from "redux/actions/location";
import { showNotification } from "redux/actions/notification";
import * as services from "services/location";
import { IGraphQLResponse } from "common/typings";

export function* getWardsSaga(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getWardsByDistrict,
    variables,
  );
  yield put(setLoading(false));
  const { getWardsByDistrict: result } = response?.data || {};
  if (result) {
    yield put(getWardsSuccess(result));
  }
}

export function* updateWardSaga(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(services.updateWard, variables);
  yield put(setLoading(false));
  const { updateWard: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        title: "Thành công",
        type: "success",
        message: "Cập nhật Phường/Xã/Thị trấn thành công!",
      }),
    );
  }
}
export function* deleteWardSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(services.deleteWard, variables);
  yield put(setLoading(false));

  const { deleteWard: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        title: "",
        type: "success",
        message: "Xoá Phường/Xã/Thị trấn thành công",
      }),
    );
  }
}
export function* createWardSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(services.createWard, variables);
  yield put(setLoading(false));

  const { createWard: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        title: "",
        type: "success",
        message: "Tạo Phường/Xã/Thị trấn thành công",
      }),
    );
  }
}
