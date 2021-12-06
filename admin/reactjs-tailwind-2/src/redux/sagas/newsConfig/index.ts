import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/newsConfig";

import {
    getAllCategoryLevel2,
    deleteCategoryLevel2,
    updateCategoryLevel2,
    createCategoryLevel2,
} from "./categoryLv2";
import {
    getAllCategoryLevel1Saga,
    createCategoryLevel1Saga,
    updateCategoryLevel1Saga,
    deleteCategoryLevel1Saga,
} from "../newsConfig/categorylv1";
import {
    getAllJobLevel,
    updateJobLevel,
    createJobLevel,
    deleteJobLevel,
} from "./jobLevel";
import {
    getAllJobTypeSaga,
    updateJobTypeSaga,
    createJobTypeSaga,
    deleteJobTypeSaga,
} from "./jobType";
import {
    getAllBenefitSaga,
    updateBenefitSaga,
    createBenefitSaga,
    deleteBenefitSaga,
} from "../newsConfig/benefit";

import {
    createKeyword,
    deleteKeyword,
    getAllKeyword,
    updateKeyword,
} from "./keyword";

export default function* jobSaga() {
    yield all([
        // CATEGORY LEVEL 1
        takeLatest(types.GET_ALL_CATEGORY_LEVEL1, getAllCategoryLevel1Saga),
        takeLatest(types.CREATE_CATEGORY_LEVEL1, createCategoryLevel1Saga),
        takeLatest(types.UPDATE_CATEGORY_LEVEL1, updateCategoryLevel1Saga),
        takeLatest(types.DELETE_CATEGORY_LEVEL1, deleteCategoryLevel1Saga),

        // CATEGORY LEVEL 2
        takeLatest(types.GET_ALL_CATEGORY_LEVEL_2, getAllCategoryLevel2),
        takeLatest(types.DELETE_CATEGORY_LEVEL_2, deleteCategoryLevel2),
        takeLatest(types.UPDATE_CATEGORY_LEVEL_2, updateCategoryLevel2),
        takeLatest(types.CREATE_CATEGORY_LEVEL_2, createCategoryLevel2),

        // JOB LEVEL
        takeLatest(types.GET_ALL_JOB_LEVEL, getAllJobLevel),
        takeLatest(types.UPDATE_JOB_LEVEL, updateJobLevel),
        takeLatest(types.CREATE_JOB_LEVEL, createJobLevel),
        takeLatest(types.DELETE_JOB_LEVEL, deleteJobLevel),

        // JOB TYPE
        takeLatest(types.GET_ALL_JOB_TYPE, getAllJobTypeSaga),
        takeLatest(types.CREATE_JOB_TYPE, createJobTypeSaga),
        takeLatest(types.UPDATE_JOB_TYPE, updateJobTypeSaga),
        takeLatest(types.DELETE_JOB_TYPE, deleteJobTypeSaga),

        // BENEFIT
        takeLatest(types.GET_ALL_BENEFIT, getAllBenefitSaga),
        takeLatest(types.CREATE_BENEFIT, createBenefitSaga),
        takeLatest(types.UPDATE_BENEFIT, updateBenefitSaga),
        takeLatest(types.DELETE_BENEFIT, deleteBenefitSaga),

        // KEYWORD
        takeLatest(types.GET_ALL_KEYWORD, getAllKeyword),
        takeLatest(types.UPDATE_KEYWORD, updateKeyword),
        takeLatest(types.CREATE_KEYWORD, createKeyword),
        takeLatest(types.DELETE_KEYWORD, deleteKeyword),
    ]);
}
