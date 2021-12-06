import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "@common/typings";
import * as services from "@services/recruitment";
import { getAllMostKeywordSuccess } from "@redux/actions/recruitment";

export function* getMostKeywordSaga() {
  const response: IGraphQLResponse = yield call(services.getMostKeyword);
  const { getMostSearchKeyword: result } = response?.data || {};
  if (result) {
    yield put(getAllMostKeywordSuccess(result));
  }
}
