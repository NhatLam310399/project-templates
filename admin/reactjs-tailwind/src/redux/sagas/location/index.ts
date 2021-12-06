import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/location";
import {
  getDistrictsSaga,
  updateDistrictSaga,
  createDistrictSaga,
  deleteDistrictSaga,
  // getAllDistrictsSaga,
} from "./districts";
import {
  getProvincesSaga,
  updateProvinceSaga,
  createProvinceSaga,
  deleteProvinceSaga,
} from "./provinces";
import {
  createStreetSaga,
  deleteStreetSaga,
  getStreetByIdSaga,
  getStreetsSaga,
  updateStreetSaga,
} from "./streets";
import {
  getWardsSaga,
  updateWardSaga,
  createWardSaga,
  deleteWardSaga,
} from "./wards";

export default function* locationSaga() {
  yield all([
    // Provinces
    takeLatest(types.GET_PROVINCES, getProvincesSaga),
    takeLatest(types.UPDATE_PROVINCE, updateProvinceSaga),
    takeLatest(types.CREATE_PROVINCE, createProvinceSaga),
    takeLatest(types.DELETE_PROVINCE, deleteProvinceSaga),
    // Districts
    takeLatest(types.GET_DISTRICTS, getDistrictsSaga),
    // takeLatest(types.GET_DISTRICTS, getAllDistrictsSaga),
    takeLatest(types.UPDATE_DISTRICT, updateDistrictSaga),
    takeLatest(types.CREATE_DISTRICT, createDistrictSaga),
    takeLatest(types.DELETE_DISTRICT, deleteDistrictSaga),
    // Wards
    takeLatest(types.GET_WARDS, getWardsSaga),
    takeLatest(types.UPDATE_WARD, updateWardSaga),
    takeLatest(types.CREATE_WARD, createWardSaga),
    takeLatest(types.DELETE_WARD, deleteWardSaga),
    // Streets
    takeLatest(types.GET_STREETS, getStreetsSaga),
    takeLatest(types.GET_STREET_BY_ID, getStreetByIdSaga),
    takeLatest(types.CREATE_STREET, createStreetSaga),
    takeLatest(types.UPDATE_STREET, updateStreetSaga),
    takeLatest(types.DELETE_STREET, deleteStreetSaga),
  ]);
}
