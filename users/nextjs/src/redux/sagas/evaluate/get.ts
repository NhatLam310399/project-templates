import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "@common/typings";
import * as services from "@services/evaluate";
import { getEvaluateByUserIdSuccess } from "@redux/actions/evaluate";

export function* getEvaluateByUserIdSaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.getEvaluateByUserId,
    variables,
  );
  const { getEvaluateByUser: result } = response?.data || {};
  if (result) {
    yield put(getEvaluateByUserIdSuccess(result));
  }
}
