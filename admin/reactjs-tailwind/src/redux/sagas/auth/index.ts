import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/reducers/auth/actionTypes";
import { getToken, refreshToken } from "./get";

export default function* authSaga() {
  yield all([
    takeLatest(types.GET_TOKEN, getToken),
    takeLatest(types.REFRESH_TOKEN, refreshToken),
  ]);
}
