import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/closingTime";
import {
  createClosingTimeSaga,
  deleteClosingTimeByIdSaga,
  getAllClosingTimeSaga,
  updateClosingTimeSaga,
} from "./closingTime";

export default function* closingTimes() {
  yield all([
    takeLatest(types.GET_ALL_CLOSING_TIME, getAllClosingTimeSaga),
    takeLatest(types.CREATE_CLOSING_TIME, createClosingTimeSaga),
    takeLatest(types.UPDATE_CLOSING_TIME, updateClosingTimeSaga),
    takeLatest(types.DELETE_CLOSING_TIME_BY_ID, deleteClosingTimeByIdSaga),
  ]);
}
