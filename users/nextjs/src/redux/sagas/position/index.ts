import { all, takeLatest } from "redux-saga/effects";
import * as types from "@redux/types/position";
import { positionSaga } from "./position";

export default function* position() {
  yield all([takeLatest(types.GET_POSITION, positionSaga)]);
}
