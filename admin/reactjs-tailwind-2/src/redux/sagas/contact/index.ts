import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/contact";
import { getAllContactSaga, deleteContactSaga } from "./contact";

export default function* companySaga() {
    yield all([
        takeLatest(types.GET_ALL_CONTACT, getAllContactSaga),
        takeLatest(types.DELETE_CONTACT, deleteContactSaga),
    ]);
}
