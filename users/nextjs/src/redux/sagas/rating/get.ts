import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "@common/typings";
import * as services from "@services/rating";
import { getRatingByUserIdSuccess } from "@redux/actions/rating";

export function* getRatingByUserIdSaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.getRatingByUserId,
    variables,
  );
  const { getRatingByUser: result } = response?.data || {};
  if (result) {
    yield put(getRatingByUserIdSuccess(result));
  }
}
