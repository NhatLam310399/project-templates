import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/overview";
import { getAllNotifySettingSaga } from "./overview";

export default function* overviewSaga() {
    yield all([takeLatest(types.GET_OVERVIEW, getAllNotifySettingSaga)]);
}
