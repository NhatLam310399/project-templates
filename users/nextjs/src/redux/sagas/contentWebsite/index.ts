import { all, takeLatest } from "redux-saga/effects";
import * as types from "@redux/types/contentWebsite";
import { getContentWebsiteSaga } from "./contentWebsite";
import { getSeoWebsiteSaga } from "./SEO";

export default function* contentWebsiteSaga() {
  yield all([
    takeLatest(types.GET_CONTENT_WEBSITE, getContentWebsiteSaga),
    takeLatest(types.GET_SEO_WEBSITE, getSeoWebsiteSaga),
  ]);
}
