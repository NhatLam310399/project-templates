import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/typings";
import { setLoading } from "redux/actions/common";
import { getAllHomePageManagerSuccess } from "redux/actions/homepage";
import * as services from "services/homepage";

export function* getAllHomePageManagerSaga(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getAllHomePageManager,
    variables,
  );
  yield put(setLoading(false));

  const { getAllHomePageManager: result } = response?.data || {};
  if (result) {
    yield put(getAllHomePageManagerSuccess(result));
  }
}
