import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "@common/typings";
import * as services from "@services/user";
import { getUserProfileSuccess } from "@redux/actions/user";

export function* getUserProfileSaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.getUserProfile,
    variables,
  );
  const { getUserById: result } = response?.data || {};
  if (result) {
    yield put(getUserProfileSuccess(result));
  }
}
