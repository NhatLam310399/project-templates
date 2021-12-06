import { call, put } from "redux-saga/effects";
import { getProvincesSuccess } from "redux/actions/location";
import * as services from "services/location";
import { IGraphQLResponse } from "common/typings";
import { setLoading } from "redux/actions/common";

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
