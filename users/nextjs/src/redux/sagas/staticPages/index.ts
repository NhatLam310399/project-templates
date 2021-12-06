import { all, takeLatest } from "redux-saga/effects";
import { getAllStaticPagesSaga, getStaticPageBySlugSaga } from "./get";
import * as types from "@redux/types/staticPages";

export default function* staticPagesSaga() {
  yield all([
    takeLatest(types.GET_ALL_STATIC_PAGES, getAllStaticPagesSaga),
    takeLatest(types.GET_STATIC_PAGE_BY_SLUG, getStaticPageBySlugSaga),
  ]);
}
