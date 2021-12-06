import { IGraphQLResponse } from "common/typings";
import { setLoading, actionSuccess } from "redux/actions/common";
import { call, put } from "redux-saga/effects";
import * as services from "services/booking";
import { getDetailBookingSuccess } from "redux/actions/booking";
import { showNotification } from "redux/actions/notification";

export function* getDetailBookingSaga(payload: any) {
  const variable = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getDetailBooking,
    variable,
  );
  yield put(setLoading(false));
  const { getDetailBooking: result } = response.data || {};
  if (result) {
    yield put(getDetailBookingSuccess(result));
  }
}
