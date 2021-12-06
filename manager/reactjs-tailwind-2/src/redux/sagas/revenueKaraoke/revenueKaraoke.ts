import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/typings";
import { setLoading } from "redux/actions/common";
import { getRevenueKaraokeSuccess } from "redux/actions/revenueKaraoke";
import * as services from "services/revenueKaraoke";

export function* getRevenueKaraokeSaga(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getRevenueKaraoke,
    variables,
  );
  yield put(setLoading(false));

  const { getRevenueKaraoke: result } = response?.data || {};
  if (result) {
    yield put(getRevenueKaraokeSuccess(result));
  }
}
