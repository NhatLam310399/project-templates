import { call, put } from "redux-saga/effects";
import { getProvincesSuccess } from "redux/actions/location";
import { showNotification } from "redux/actions/notification";
import * as services from "services/location";
import { IGraphQLResponse } from "common/typings";
import { setLoading, actionSuccess } from "redux/actions/common";

export function* getProvincesSaga(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getProvinces,
    variables,
  );
  yield put(setLoading(false));

  const { getProvinces: result } = response?.data || {};
  if (result) {
    yield put(getProvincesSuccess(result));
  }
}

export function* updateProvinceSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.updateProvince,
    variables,
  );
  yield put(setLoading(false));

  const { updateProvince: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        title: "Thành công",
        type: "success",
        message: "Cập nhật Tỉnh/Thành phố thành công",
      }),
    );
  }
}
export function* deleteProvinceSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.deleteProvince,
    variables,
  );
  yield put(setLoading(false));

  const { deleteProvince: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        title: "",
        type: "success",
        message: "Tạo Tỉnh/Thành phố thành công",
      }),
    );
  }
}
export function* createProvinceSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.createProvince,
    variables,
  );
  yield put(setLoading(false));

  const { createProvince: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        title: "",
        type: "success",
        message: "Tạo Tỉnh/Thành phố thành công",
      }),
    );
  }
}
