import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/booking";
import {
  getAllBooking,
  updateBooking,
  updateFinishBooking,
  updateStatusBooking,
  deleteBooking,
} from "./booking";

export default function* authSaga() {
  yield all([
    takeLatest(types.GET_ALL_BOOKING, getAllBooking),
    takeLatest(types.UPDATE_BOOKING, updateBooking),
    takeLatest(types.UPDATE_STATUS_BOOKING, updateStatusBooking),
    takeLatest(types.UPDATE_FINISH_BOOKING, updateFinishBooking),
    takeLatest(types.DELETE_BOOKING, deleteBooking),
  ]);
}
