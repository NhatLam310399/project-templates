import { all, takeLatest } from "redux-saga/effects";
import * as types from "@redux/types/tag";
import { getAllTag } from "./get";

export default function* getAllTagSaga() {
  yield all([takeLatest(types.GET_ALL_TAG, getAllTag)]);
}
