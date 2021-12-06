import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/request";
import { getAllRequestSaga, getRequestById } from "./get";
import { acceptRequest } from "./accept";
import { deleteRequest } from "./delete";

export default function* requestSaga() {
  yield all([
    takeLatest(types.GET_REQUEST_BY_ID, getRequestById),
    takeLatest(types.GET_ALL_REQUEST, getAllRequestSaga),
    takeLatest(types.ACCEPT_REQUEST, acceptRequest),
    takeLatest(types.DELETE_REQUEST, deleteRequest),
  ]);
}
