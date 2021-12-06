import { all, takeLatest } from "redux-saga/effects";
import * as types from "@redux/types/blog";
import { getAllBlogSaga, getBlogBySlugSaga } from "./blog";

export default function* companySaga() {
  yield all([
    takeLatest(types.GET_ALL_BLOG, getAllBlogSaga),
    takeLatest(types.GET_BLOG_BY_SLUG, getBlogBySlugSaga),
  ]);
}
