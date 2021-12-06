import { call, put } from "redux-saga/effects";
import { setLoading, actionSuccess } from "redux/actions/common";
import { getDistrictsSuccess } from "redux/actions/location";
import { showNotification } from "redux/actions/notification";
import * as locationService from "services/location";
import { IGraphQLResponse } from "typings";

export function* getDistrictsSaga(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    locationService.getDistricts,
    variables,
  );
  yield put(setLoading(false));
  const { getDistrictsByProvince: result } = response?.data;
  if (result) {
    yield put(getDistrictsSuccess(result));
  }
}

export function* updateDistrictSaga(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    locationService.updateDistrict,
    variables,
  );
  yield put(setLoading(false));
  const { data: result } = response;
  const { updateDistrict = null } = result || {};
  if (updateDistrict) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        title: "Thành công",
        message: "Đã cập nhật Quận/Huyện/Thị xã thành công",
      }),
    );
  }
}
