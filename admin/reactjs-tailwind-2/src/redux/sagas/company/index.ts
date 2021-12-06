import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/company";
import {
    createCompanySaga,
    deleteCompanySaga,
    getCompaniesSaga,
    getCompanyByIdSaga,
    updateCompanySaga,
} from "./company";

export default function* companySaga() {
    yield all([
        takeLatest(types.GET_COMPANIES, getCompaniesSaga),
        takeLatest(types.GET_COMPANY_BY_ID, getCompanyByIdSaga),
        takeLatest(types.CREATE_COMPANY, createCompanySaga),
        takeLatest(types.UPDATE_COMPANY, updateCompanySaga),
        takeLatest(types.DELETE_COMPANY, deleteCompanySaga),
    ]);
}
