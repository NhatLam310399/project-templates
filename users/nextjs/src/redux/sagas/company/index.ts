import { all, takeLatest } from "redux-saga/effects";
import * as types from "@redux/types/company";
import {
  getAllCompanySaga,
  getCompanySaga,
  getCompanyBySlugSaga,
  getNewestCompanySaga,
  getMostViewCompanySaga,
  getMostAppliedCompanySaga,
  getMostRecruitingCompanySaga,
  updateCompanySaga,
  updateCompanyProvinceSaga,
  setSubscribeCompanySaga,
  setSeenCompanySaga,
} from "./company";

export default function* companySaga() {
  yield all([
    takeLatest(types.GET_ALL_COMPANY, getAllCompanySaga),
    takeLatest(types.GET_COMPANY, getCompanySaga),
    takeLatest(types.UPDATE_COMPANY, updateCompanySaga),
    takeLatest(types.UPDATE_COMPANY_PROVINCE, updateCompanyProvinceSaga),
    takeLatest(types.SET_SUBSCRIBE_COMPANY, setSubscribeCompanySaga),
    takeLatest(types.GET_NEWEST_COMPANY, getNewestCompanySaga),
    takeLatest(types.GET_MOST_VIEW_COMPANY, getMostViewCompanySaga),
    takeLatest(types.GET_MOST_APPLIED_COMPANY, getMostAppliedCompanySaga),
    takeLatest(types.GET_MOST_RECRUITING_COMPANY, getMostRecruitingCompanySaga),
    takeLatest(types.GET_COMPANY_BY_SLUG, getCompanyBySlugSaga),
    takeLatest(types.SET_SEEN_COMPANY, setSeenCompanySaga),
  ]);
}
