import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/reducers/auth/actionTypes";
import { getToken } from "./getToken";

export default function* authSaga() {
    yield all([takeLatest(types.GET_TOKEN, getToken)]);
}
