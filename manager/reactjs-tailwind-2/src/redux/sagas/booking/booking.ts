import { IGraphQLResponse } from "common/typings";
import { setLoading, actionSuccess } from "redux/actions/common";
import { call, put } from "redux-saga/effects";
import * as services from "services/booking";
import { getAllBookingSuccess } from "redux/actions/booking";
import { showNotification } from "redux/actions/notification";

export function* getAllBookingSaga(payload: any) {
  const variable = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getAllBooking,
    variable,
  );
  yield put(setLoading(false));
  const { getAllBooking: result } = response.data || {};
  if (result) {
    yield put(getAllBookingSuccess(result));
  }
}

export function* updateBookingSaga(payload: any) {
  const variable = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.updateBooking,
    variable,
  );
  yield put(setLoading(false));
  const { updateBooking: result } = response.data || {};

  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        message: "Cập nhật trạng thái đặt lịch thành công",
        type: "success",
        title: "",
      }),
    );
  }
}

export function* updateStatusBookingSaga(payload: any) {
  const variable = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.updateStatusBooking,
    variable,
  );
  yield put(setLoading(false));
  const { updateStatusBooking: result } = response.data || {};

  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        message: "Cập nhật trạng thái đặt lịch thành công",
        type: "success",
        title: "",
      }),
    );
  }
}

export function* updateFinishBookingSaga(payload: any) {
  const variable = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.updateFinishBooking,
    variable,
  );
  yield put(setLoading(false));
  const { updateFinishBooking: result } = response.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        message: "Cập nhật trạng thái đặt lịch thành công",
        type: "success",
        title: "",
      }),
    );
  }
}
