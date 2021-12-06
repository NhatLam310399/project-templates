import { all, takeLatest } from "redux-saga/effects";
import { updateUserProfileSaga } from "./update";
import { getUserProfileSaga } from "./get";
import * as types from "@redux/types/user";

export default function* userSaga() {
  yield all([
    takeLatest(types.UPDATE_USER_PROFILE, updateUserProfileSaga),
    takeLatest(types.GET_USER_PROFILE, getUserProfileSaga),
  ]);
}
