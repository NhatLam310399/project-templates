import { call, put } from "redux-saga/effects";
import { getProvincesSuccess } from "@redux/actions/location";
import * as services from "@services/location";
import { IGraphQLResponse } from "@common/typings";

export function* getProvincesSaga() {
  const response: IGraphQLResponse = yield call(services.getProvinces);
  const { getProvinces: result } = response?.data || {};
  if (result) {
    yield put(getProvincesSuccess(result));
  }
}
