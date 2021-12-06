import { all, takeLatest } from "redux-saga/effects";
import {
  createUserSaga,
  checkExistEmail,
  checkExistEmailOtherProvider,
} from "./create";
import { updatePassword } from "./update";
import * as types from "redux/types/user";

export default function* userSaga() {
  yield all([
    takeLatest(types.CREATE_USER, createUserSaga),
    takeLatest(types.CHECK_EXIST_EMAIL, checkExistEmail),
    takeLatest(
      types.CHECK_EXIST_EMAIL_OTHER_PROVIDER,
      checkExistEmailOtherProvider,
    ),
    takeLatest(types.UPDATE_PASSWORD, updatePassword),
  ]);
}
