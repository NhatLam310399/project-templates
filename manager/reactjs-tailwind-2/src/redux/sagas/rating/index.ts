import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/rating";
import { getAllRatingSaga } from "./rating";

export default function* ratingSaga() {
  yield all([takeLatest(types.GET_ALL_RATING, getAllRatingSaga)]);
}
