import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/booking";
import {
  getAllBookingSaga,
  updateBookingSaga,
  updateFinishBookingSaga,
  updateStatusBookingSaga,
} from "./booking";

import { getDetailBookingSaga } from "./detailBooking";

export default function* authSaga() {
  yield all([
    takeLatest(types.GET_ALL_BOOKING, getAllBookingSaga),
    takeLatest(types.UPDATE_BOOKING, updateBookingSaga),
    takeLatest(types.UPDATE_STATUS_BOOKING, updateStatusBookingSaga),
    takeLatest(types.UPDATE_FINISH_BOOKING, updateFinishBookingSaga),
    // detail booking
    takeLatest(types.GET_DETAIL_BOOKING, getDetailBookingSaga),
  ]);
}
