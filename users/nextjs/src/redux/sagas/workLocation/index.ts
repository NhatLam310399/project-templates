import { all, takeLatest } from "redux-saga/effects";

import * as types from "@redux/types/workLocation";
import {
  getWorkLocation,
  getWorkLocationByCompany,
  createWorkLocation,
  deleteWorkLocation,
  updateWorkLocation,
} from "./get";

export default function* workLocationSaga() {
  yield all([
    takeLatest(types.GET_ALL_WORK_LOCATION, getWorkLocation),
    takeLatest(types.GET_WORK_LOCATION_BY_COMPANY, getWorkLocationByCompany),
    takeLatest(types.CREATE_WORK_LOCATION, createWorkLocation),
    takeLatest(types.DELETE_WORK_LOCATION, deleteWorkLocation),
    takeLatest(types.UPDATE_WORK_LOCATION, updateWorkLocation),
  ]);
}
