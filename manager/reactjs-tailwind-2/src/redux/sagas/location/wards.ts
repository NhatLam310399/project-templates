import { call, put } from "redux-saga/effects";
import { setLoading } from "redux/actions/common";
import { getWardsSuccess } from "redux/actions/location";
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
