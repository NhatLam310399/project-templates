import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/generalSetting";
import { getSeoSaga, updateSeoSaga } from "./seo";
import {
    createPagesSaga,
    updatePagesSaga,
    getAllPagesSaga,
    removePagesSaga,
} from "./pages";
import {
    getContentWebsiteByIdSaga,
    updateContentWebsiteSaga,
} from "./contentWebsite";

export default function* generalSettingSaga() {
    yield all([
        // STATIC PAGE
        takeLatest(types.GET_ALL_PAGES, getAllPagesSaga),
        takeLatest(types.CREATE_PAGES, createPagesSaga),
        takeLatest(types.UPDATE_PAGES, updatePagesSaga),
        takeLatest(types.REMOVE_PAGES, removePagesSaga),

        // SEO
        takeLatest(types.GET_SEO, getSeoSaga),
        takeLatest(types.UPDATE_SEO, updateSeoSaga),

        // CONTENT WEBSITE
        takeLatest(types.GET_CONTENT_WEBSITE_BY_ID, getContentWebsiteByIdSaga),
        takeLatest(types.UPDATE_CONTENT_WEBSITE, updateContentWebsiteSaga),
    ]);
}
