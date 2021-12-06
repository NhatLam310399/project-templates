import { put, call } from "redux-saga/effects";

import { setLoading, actionSuccess } from "@redux/actions/common";
import { IGraphQLResponse } from "@common/typings";
import * as services from "@services/auth";

export function* updateUserEmailPassword(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.updateUserEmailPassword,
    variables,
  );
  yield put(setLoading(false));

  const { updateUserEmailPassword: result } = response?.data || {};

  if (result) {
    yield put(actionSuccess());
  }
}
