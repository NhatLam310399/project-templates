import { call, put } from "redux-saga/effects";
import { setLoading, actionSuccess } from "redux/actions/common";
import { getWardsSuccess } from "redux/actions/location";
import { showNotification } from "redux/actions/notification";
import * as services from "services/location";
import { IGraphQLResponse } from "typings";

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
