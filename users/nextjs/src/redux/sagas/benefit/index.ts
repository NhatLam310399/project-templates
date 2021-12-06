import { all, takeLatest } from "redux-saga/effects";
import * as types from "@redux/types/benefit";
import { getAllBenefit } from "./get";

export default function* benefitSaga() {
  yield all([takeLatest(types.GET_ALL_BENEFIT, getAllBenefit)]);
}
