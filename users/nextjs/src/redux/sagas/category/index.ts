import { all, takeLatest } from "redux-saga/effects";
import * as types from "@redux/types/category";
import { getAllCategoryLevel1, getAllCategoryLevel2 } from "./category";

export default function* categorySaga() {
  yield all([takeLatest(types.GET_ALL_CATEGORY_1_JOB, getAllCategoryLevel1)]);
  yield all([takeLatest(types.GET_ALL_CATEGORY_2_JOB, getAllCategoryLevel2)]);
}
// yield all([takeLatest(types.GET_ALL_CATEGORY, getAllCategory)])
