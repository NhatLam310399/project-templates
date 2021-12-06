import { all, takeLatest } from "redux-saga/effects";
import * as types from "@redux/types/location";
import { getDistrictsSaga } from "./districts";
import { getProvincesSaga } from "./provinces";
import { getStreetByProvinceAndDistrict } from "./streets";
import { getWardsSaga } from "./wards";

export default function* locationSaga() {
  yield all([
    // Provinces
    takeLatest(types.GET_PROVINCES, getProvincesSaga),

    // Districts
    takeLatest(types.GET_DISTRICTS, getDistrictsSaga),

    // Wards
    takeLatest(types.GET_WARDS, getWardsSaga),

    // Streets
    takeLatest(
      types.GET_STREETS_BY_PROVINCE_AND_DISTRICT,
      getStreetByProvinceAndDistrict,
    ),
  ]);
}
