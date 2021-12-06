import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/blog";
import {
    createCareerCounselingSaga,
    deleteCareerCounselingSaga,
    getAllCareerCounselingSaga,
    updateCareerCounselingSaga,
} from "./blog";
import {
    createCategorySaga,
    deleteCategorySaga,
    getAllCategorySaga,
    updateCategorySaga,
} from "./category";
import {
    createTagSaga,
    deleteTagSaga,
    getAllTagSaga,
    updateTagSaga,
} from "./tag";

export default function* companySaga() {
    yield all([
        takeLatest(types.GET_ALL_CAREER_COUNSELING, getAllCareerCounselingSaga),
        takeLatest(types.CREATE_CAREER_COUNSELING, createCareerCounselingSaga),
        takeLatest(types.UPDATE_CAREER_COUNSELING, updateCareerCounselingSaga),
        takeLatest(types.DELETE_CAREER_COUNSELING, deleteCareerCounselingSaga),
        takeLatest(types.GET_ALL_CATEGORY, getAllCategorySaga),
        takeLatest(types.CREATE_CATEGORY, createCategorySaga),
        takeLatest(types.UPDATE_CATEGORY, updateCategorySaga),
        takeLatest(types.DELETE_CATEGORY, deleteCategorySaga),
        takeLatest(types.GET_ALL_TAG, getAllTagSaga),
        takeLatest(types.CREATE_TAG, createTagSaga),
        takeLatest(types.UPDATE_TAG, updateTagSaga),
        takeLatest(types.DELETE_TAG, deleteTagSaga),
    ]);
}
