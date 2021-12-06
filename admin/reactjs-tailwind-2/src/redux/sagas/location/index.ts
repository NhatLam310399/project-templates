import { all, takeLatest } from "redux-saga/effects";
import { createDistrict } from "redux/actions/location";
import * as types from "redux/types/location";
import {
    getDistrictsSaga,
    updateDistrictSaga,
    createDistrictSaga,
    deleteDistrictSaga,
} from "./districts";
import {
    getProvincesSaga,
    getSuggestionProvincesSaga,
    updateProvinceSaga,
} from "./provinces";
import {
    createStreetSaga,
    deleteStreetSaga,
    getStreetByIdSaga,
    getStreetsByWardIdSaga,
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
        takeLatest(types.GET_SUGGESTION_PROVINCES, getSuggestionProvincesSaga),
        takeLatest(types.UPDATE_PROVINCE, updateProvinceSaga),
        // Districts
        takeLatest(types.GET_DISTRICTS, getDistrictsSaga),
        takeLatest(types.UPDATE_DISTRICT, updateDistrictSaga),
        takeLatest(types.CREATE_DISTRICT, createDistrictSaga),
        takeLatest(types.CLEAR_DISTRICTS, deleteDistrictSaga),

        // Wards
        takeLatest(types.GET_WARDS, getWardsSaga),
        takeLatest(types.UPDATE_WARD, updateWardSaga),
        takeLatest(types.CREATE_WARD, createWardSaga),
        takeLatest(types.CLEAR_WARDS, deleteWardSaga),

        // Streets
        takeLatest(types.GET_STREETS_BY_WARD_ID, getStreetsByWardIdSaga),
        takeLatest(types.GET_STREET_BY_ID, getStreetByIdSaga),
        takeLatest(types.CREATE_STREET, createStreetSaga),
        takeLatest(types.UPDATE_STREET, updateStreetSaga),
        takeLatest(types.DELETE_STREET, deleteStreetSaga),
    ]);
}
