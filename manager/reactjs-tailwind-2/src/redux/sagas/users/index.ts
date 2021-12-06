import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/users";
import { getUserByIdSaga, updateUserProfile } from "./users";

export default function* users() {
  yield all([
    takeLatest(types.GET_USER_BY_ID, getUserByIdSaga),
    takeLatest(types.UPDATE_USER_PROFILE, updateUserProfile),
  ]);
}
