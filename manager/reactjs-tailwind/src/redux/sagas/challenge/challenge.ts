import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "typings";
import * as services from "services/challenge";
import { getAllChallengeTypeSuccess } from "redux/actions/challenge"

export function* getAllChallengeType(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.getAllChallengeType,
    variables,
  );
  const { getAllChallengeType: result } = response?.data || {};
  if (result) {
    yield put(getAllChallengeTypeSuccess(result));
  }
}