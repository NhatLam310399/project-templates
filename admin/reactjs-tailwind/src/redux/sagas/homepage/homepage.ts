import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/typings";
import { setLoading } from "redux/actions/common";
import { getAllHomePageSuccess } from "redux/actions/homepage";
import * as services from "services/homepage";

export function* getAllHomePageSaga() {
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(services.getAllHomePage);
  yield put(setLoading(false));

  const { getAllHomePage: result } = response?.data || {};
  if (result) {
    yield put(getAllHomePageSuccess(result));
  }
}
