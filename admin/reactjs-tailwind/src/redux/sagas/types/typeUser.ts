import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/typings";
import * as services from "services/types";
import { getAllTypeUserSuccess } from "redux/actions/types";

export function* getAllTypeUserSaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.getAllTypeUser,
    variables,
  );
  const { getAllTypeUser: result } = response?.data || {};
  if (result) {
    yield put(getAllTypeUserSuccess(result));
  }
}
