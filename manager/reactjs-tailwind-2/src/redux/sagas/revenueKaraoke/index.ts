import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/revenueKaraoke";
import { getRevenueKaraokeSaga } from "./revenueKaraoke";

export default function* revenueKaraokeSaga() {
  yield all([takeLatest(types.GET_REVENUE_KARAOKE, getRevenueKaraokeSaga)]);
}
