import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/categories";
import { getAllCategoriesSaga } from "./categories";

export default function* couponSaga() {
  yield all([takeLatest(types.GET_ALL_CATEGORIES, getAllCategoriesSaga)]);
}
