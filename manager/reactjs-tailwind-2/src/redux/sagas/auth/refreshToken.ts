import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/typings";
import * as services from "services/auth";
import { setLoading } from "redux/actions/common";
import { getTokenSuccess } from "redux/actions/auth";

export function* refreshTokenSaga() {
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(services.refreshToken);
  yield put(setLoading(false));
  const { refreshToken: result } = response?.data || {};

  if (result) {
    yield put(getTokenSuccess(result));
  }
}
