import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/staticPage";
import {
  createPagesSaga,
  updatePagesSaga,
  getAllPagesSaga,
  removePagesSaga,
} from "./staticPage";

export default function* staticPageSaga() {
  yield all([
    // STATIC PAGE
    takeLatest(types.REMOVE_PAGE, removePagesSaga),
    takeLatest(types.GET_ALL_PAGES, getAllPagesSaga),
    takeLatest(types.CREATE_PAGE, createPagesSaga),
    takeLatest(types.UPDATE_PAGE, updatePagesSaga),
  ]);
}
