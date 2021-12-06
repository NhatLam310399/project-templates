import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/profile";
import { getProfileSaga } from "./getProfile";
import { updateUserProfileSaga } from "./updateUserProfile";

export default function* profileSaga() {
  yield all([
    takeLatest(types.GET_PROFILE, getProfileSaga),
    takeLatest(types.UPDATE_USER_PROFILE, updateUserProfileSaga),
  ]);
}
