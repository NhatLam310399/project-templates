import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/auth";
import { getTokenSaga } from "./getToken";
import { refreshTokenSaga } from "./refreshToken";

export default function* authSaga() {
  yield all([
    takeLatest(types.GET_TOKEN, getTokenSaga),
    takeLatest(types.REFRESH_TOKEN, refreshTokenSaga),
  ]);
}
