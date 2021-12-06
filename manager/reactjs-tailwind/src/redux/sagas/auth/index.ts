import { all, takeLatest } from "redux-saga/effects";
import { getToken } from "./get";
import { login } from "./login";
import { resetPassword } from "./resetPassword";
import { RESET_PASSWORD } from "redux/types/resetPassword";
import * as types from "redux/types/auth";

export default function* authSaga() {
  yield all([
    takeLatest(types.GET_TOKEN, getToken),
    takeLatest(types.LOGIN, login),
    takeLatest(RESET_PASSWORD, resetPassword),
  ]);
}
