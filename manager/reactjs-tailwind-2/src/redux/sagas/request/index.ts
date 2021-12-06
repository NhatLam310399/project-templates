import { all, takeLatest } from "@redux-saga/core/effects";
import { createRequestSaga } from "./create";
import * as types from "redux/types/request";

export default function* requestSaga() {
  yield all([takeLatest(types.CREATE_REQUEST, createRequestSaga)]);
}
