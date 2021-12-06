import { call, put } from "redux-saga/effects";
import { IGetToken, IGraphQLResponse } from "common/typings";
import * as services from "services/auth";
import { getTokenSuccess, refreshTokenSuccess } from "redux/actions/auth";

export function* getToken(payload: any) {
  const variables: IGetToken = { idToken: payload.payload.idToken };
  const response: IGraphQLResponse = yield call(
    services.getAccessToken,
    variables,
  );
  const result = response?.data || {};
  if (result) {
    yield put(getTokenSuccess(result));
  }
}

export function* refreshToken(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.refreshToken,
    variables,
  );
  const { refreshToken: result } = response?.data || {};
  if (result) {
    yield put(refreshTokenSuccess(result));
  }
}
