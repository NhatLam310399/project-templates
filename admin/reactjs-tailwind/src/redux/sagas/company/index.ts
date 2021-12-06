import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/company";
import {
  createCompanySaga,
  deleteAllCompanySaga,
  deleteCompanyByIdSaga,
  getAllCompanyHighlightSaga,
  getAllCompanySaga,
  getCompanyByIdSaga,
  updateCompanySaga,
  setPlaceHighlight,
} from "./company";

export default function* companySaga() {
  yield all([
    takeLatest(types.GET_ALL_COMPANY, getAllCompanySaga),
    takeLatest(types.GET_ALL_COMPANY_HIGHLIGHT, getAllCompanyHighlightSaga),
    takeLatest(types.GET_COMPANY_BY_ID, getCompanyByIdSaga),
    takeLatest(types.CREATE_COMPANY, createCompanySaga),
    takeLatest(types.DELETE_COMPANY_BY_ID, deleteCompanyByIdSaga),
    takeLatest(types.DELETE_ALL_COMPANY, deleteAllCompanySaga),
    takeLatest(types.UPDATE_COMPANY, updateCompanySaga),
    takeLatest(types.SET_PLACE_HIGHLIGHT, setPlaceHighlight),
  ]);
}
