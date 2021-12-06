import { all, takeLatest } from "redux-saga/effects";
import { getDistrictsSaga, updateDistrictSaga } from "./districts";
import { getProvincesSaga, updateProvinceSaga } from "./provinces";
import {
  createStreetSaga,
  deleteStreetSaga,
  getStreetByIdSaga,
  getStreetsSaga,
  updateStreetSaga,
} from "./streets";
import { getWardsSaga, updateWardSaga } from "./wards";
import * as types from "redux/types/location";

export default function* locationSaga() {
  yield all([
    // Provinces
    takeLatest(types.GET_PROVINCES, getProvincesSaga),
    takeLatest(types.UPDATE_PROVINCE, updateProvinceSaga),
    // Districts
    takeLatest(types.GET_DISTRICTS, getDistrictsSaga),
    takeLatest(types.UPDATE_DISTRICT, updateDistrictSaga),
    // Wards
    takeLatest(types.GET_WARDS, getWardsSaga),
    takeLatest(types.UPDATE_WARD, updateWardSaga),
    // Streets
    takeLatest(types.GET_STREETS, getStreetsSaga),
    takeLatest(types.GET_STREET_BY_ID, getStreetByIdSaga),
    takeLatest(types.CREATE_STREET, createStreetSaga),
    takeLatest(types.UPDATE_STREET, updateStreetSaga),
    takeLatest(types.DELETE_STREET, deleteStreetSaga),
  ]);
}
