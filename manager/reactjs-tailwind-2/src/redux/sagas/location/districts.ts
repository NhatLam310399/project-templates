import { call, put } from "redux-saga/effects";
import { setLoading } from "redux/actions/common";
import { getDistrictsSuccess } from "redux/actions/location";
import * as locationService from "services/location";
import { IGraphQLResponse } from "common/typings";

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
