import { all, takeLatest } from "redux-saga/effects";
import * as types from "@redux/types/auth";
import { getToken, refreshToken } from "./get";
import { login } from "./login";
import { createCandidate } from "./create";
import { resetPassword } from "./reset";
import { updateUserEmailPassword } from "./update";

export default function* authSaga() {
  yield all([
    takeLatest(types.GET_TOKEN, getToken),
    takeLatest(types.REFRESH_TOKEN, refreshToken),
    takeLatest(types.LOGIN, login),
    takeLatest(types.CREATE_CANDIDATE, createCandidate),
    takeLatest(types.RESET_PASSWORD, resetPassword),
    takeLatest(types.UPDATE_ACCOUNT, updateUserEmailPassword),
  ]);
}
