import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/typings";
import * as services from "services/auth";
import { getTokenSuccess } from "redux/actions/auth";

export function* getTokenSaga(payload: any) {
  const variables: any = { idToken: payload.payload.idToken };

  const response: IGraphQLResponse = yield call(
    services.getAccessToken,
    variables,
  );

  const result = response?.data;
  if (result) {
    yield put(getTokenSuccess(result));
  }
}
