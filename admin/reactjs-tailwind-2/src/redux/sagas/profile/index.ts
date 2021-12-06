import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/profile";
import { getProfileSaga, updateUseProfile } from "./profile";

export default function* profileSaga() {
    yield all([
        takeLatest(types.GET_PROFILE, getProfileSaga),
        takeLatest(types.UPDATE_USER_PROFILE, updateUseProfile),
    ]);
}
