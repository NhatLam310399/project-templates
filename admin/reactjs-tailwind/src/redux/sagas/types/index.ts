import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/types";
import {
  getTypesByCodeSaga,
  createTypesSaga,
  updateTypesSaga,
  removeTypesSaga,
} from "./types";
import { getAllTypeUserSaga } from "./typeUser";

export default function* typesSaga() {
  yield all([
    takeLatest(types.GET_TYPES_BY_CODE, getTypesByCodeSaga),
    takeLatest(types.CREATE_TYPES, createTypesSaga),
    takeLatest(types.UPDATE_TYPES, updateTypesSaga),
    takeLatest(types.REMOVE_TYPES, removeTypesSaga),
    takeLatest(types.GET_ALL_TYPE_USER, getAllTypeUserSaga),
  ]);
}
