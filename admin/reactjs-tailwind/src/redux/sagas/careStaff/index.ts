import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/careStaff";
import {
  getAllCareStaffSaga,
  getCareStaffByIdSaga,
  deleteCareStaffByIdSaga,
} from "./careStaff";

export default function* careStaffSaga() {
  yield all([
    takeLatest(types.GET_ALL_CARE_STAFF, getAllCareStaffSaga),
    takeLatest(types.GET_CARE_STAFF_BY_ID, getCareStaffByIdSaga),
    takeLatest(types.DELETE_CARE_STAFF_BY_ID, deleteCareStaffByIdSaga),
  ]);
}
