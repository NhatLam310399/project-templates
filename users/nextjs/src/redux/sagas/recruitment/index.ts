import { all, takeLatest } from "redux-saga/effects";
import * as types from "@redux/types/recruitment";
import {
  createRecruitmentSaga,
  getAllRecruitmentSaga,
  getBestRecruitment,
  getRecruitmentByCompanySaga,
  getRecruitmentByIdSaga,
  getRecruitmentBySlugSaga,
  getRecruitmentByUserSaga,
  removeSavedRecruitmentSaga,
  setAppliedRecruitmentSaga,
  setSavedRecruitmentSaga,
  setSeenRecruitmentSaga,
} from "./recruitment";
import { getMostKeywordSaga } from "./keyword";

export default function* recruitmentSaga() {
  yield all([
    takeLatest(types.GET_ALL_RECRUITMENT, getAllRecruitmentSaga),
    takeLatest(types.GET_RECRUITMENT_BY_COMPANY, getRecruitmentByCompanySaga),
    takeLatest(types.GET_RECRUITMENT_BY_USER, getRecruitmentByUserSaga),
    takeLatest(types.GET_RECRUITMENT_BY_ID, getRecruitmentByIdSaga),
    takeLatest(types.GET_RECRUITMENT_BY_SLUG, getRecruitmentBySlugSaga),
    takeLatest(types.SET_SEEN_RECRUITMENT, setSeenRecruitmentSaga),
    takeLatest(types.SET_APPLIED_RECRUITMENT, setAppliedRecruitmentSaga),
    takeLatest(types.SET_SAVED_RECRUITMENT, setSavedRecruitmentSaga),
    takeLatest(types.REMOVE_SAVED_RECRUITMENT, removeSavedRecruitmentSaga),
    takeLatest(types.CREATE_RECRUITMENT, createRecruitmentSaga),
    takeLatest(types.GET_BEST_RECRUITMENT, getBestRecruitment),

    takeLatest(types.GET_MOST_KEYWORD, getMostKeywordSaga),
  ]);
}
