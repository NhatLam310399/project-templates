import { all, takeLatest } from "redux-saga/effects";

import * as types from "@redux/types/record";
import {
  getAllRecordSaga,
  getRecordByIdSaga,
  getRecordByUserIdSaga,
} from "./get";
import { updateRecordSaga } from "./update";
import { createRecordSaga } from "./create";

export default function* recordSaga() {
  yield all([
    takeLatest(types.GET_ALL_RECORD_BY_USER, getAllRecordSaga),
    takeLatest(types.GET_RECORD_BY_ID, getRecordByIdSaga),
    takeLatest(types.GET_RECORD_BY_USER_ID, getRecordByUserIdSaga),
    takeLatest(types.UPDATE_RECORD, updateRecordSaga),
    takeLatest(types.CREATE_RECORD, createRecordSaga),
  ]);
}
