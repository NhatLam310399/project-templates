import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/types";
import { getTypesByCode } from "./get";

export default function* SportTypeSaga() {
    yield all([takeLatest(types.GET_TYPES_BY_CODE, getTypesByCode)]);
}
