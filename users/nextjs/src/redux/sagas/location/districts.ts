import { call, put } from "redux-saga/effects";
import { getDistrictsSuccess } from "@redux/actions/location";
import * as services from "@services/location";
import { IGraphQLResponse } from "@common/typings";

export function* getDistrictsSaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.getDistricts,
    variables,
  );
  const { getDistrictsByProvince: result } = response?.data || {};
  if (result) {
    yield put(getDistrictsSuccess(result));
  }
}
