import { all, takeLatest } from "redux-saga/effects";
import { getTypesByCode } from "./get";
import * as types from "redux/types/types";

export default function* SportTypeSaga() {
  yield all([takeLatest(types.GET_TYPES_BY_CODE, getTypesByCode)]);
}
