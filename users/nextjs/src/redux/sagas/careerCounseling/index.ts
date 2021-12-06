import { all, takeLatest } from "redux-saga/effects";
import { getAllCareerCounseling } from "./get";
import * as types from "@redux/types/careerCounseling";

export default function* careerCounselingSaga() {
  yield all([
    takeLatest(types.GET_ALL_CARRER_COUSELING, getAllCareerCounseling),
  ]);
}
