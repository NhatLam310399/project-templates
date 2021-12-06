import { all, takeLatest } from "redux-saga/effects";
import { getAllChallengeType } from "./challenge"
import * as types from "redux/types/challenge";

export default function* challengeSaga() {
  yield all([
    takeLatest(types.GET_ALL_CHALLENGE_TYPE, getAllChallengeType),
  ]);
}
