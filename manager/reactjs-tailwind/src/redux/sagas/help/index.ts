import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/help";
import { getAllHelpCenterLevel1Saga } from "./getAllHelpCenterLevel1";
import { getAllHelpCenterLevel2Saga } from "./getAllHelpCenterLevel2";
import { getAllArticle } from "./getAllArticle";
import { searchAllArticle } from "./searchAllArticle";

export default function* helpSaga() {
  yield all([
    takeLatest(types.GET_ALL_HELP_CENTER_LEVEL1, getAllHelpCenterLevel1Saga),
    takeLatest(types.GET_ALL_HELP_CENTER_LEVEL2, getAllHelpCenterLevel2Saga),
    takeLatest(types.GET_ALL_ARTICLE, getAllArticle),
    takeLatest(types.SEARCH_ALL_ARTICLE, searchAllArticle),
  ]);
}
