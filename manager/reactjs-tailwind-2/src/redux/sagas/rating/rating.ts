import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/typings";
import { showNotification } from "redux/actions/notification";
import { actionSuccess, setLoading } from "redux/actions/common";
import { getAllRatingSuccess } from "redux/actions/rating";
import * as services from "services/rating";

export function* getAllRatingSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getAllRating,
    variables,
  );
  yield put(setLoading(false));

  const { getAllRating: result } = response?.data || {};

  if (result) {
    yield put(getAllRatingSuccess(result));
  }
}
