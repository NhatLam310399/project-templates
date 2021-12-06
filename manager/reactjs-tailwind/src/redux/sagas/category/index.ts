import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/category";
import {
  getAllCategoryLevel1,
  getAllCategoryLevel2,
  getAllTagMenu,
} from "./productTemplate";

export default function* categorySaga() {
  yield all([
    takeLatest(types.GET_ALL_CATEGORY_LV1, getAllCategoryLevel1),
    takeLatest(types.GET_ALL_CATEGORY_LV2, getAllCategoryLevel2),
    takeLatest(types.GET_ALL_TAG_MENU, getAllTagMenu),
  ]);
}
