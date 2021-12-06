import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/typings";
import { setLoading } from "redux/actions/common";
import { getProfileSuccess } from "redux/actions/profile";
import * as services from "services/users";

export function* getProfileSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getUserById,
    variables,
  );
  yield put(setLoading(false));

  const { getUserById: result } = response?.data || {};
  if (result) {
    yield put(getProfileSuccess(result));
  }
}
