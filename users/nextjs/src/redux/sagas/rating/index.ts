import { all, takeLatest } from "redux-saga/effects";

import * as types from "@redux/types/rating";
import { getRatingByUserIdSaga } from "./get";

export default function* ratingSaga() {
  yield all([takeLatest(types.GET_RATING_BY_USER_ID, getRatingByUserIdSaga)]);
}
