import { all, takeLatest } from "redux-saga/effects";
import {
  createAdsSaga,
  getAdsAllByLocationSaga,
  getAdsAllSaga,
  getAdsByIdSaga,
  removeAdsSaga,
  updateAdsSaga,
} from "./ads";
import * as types from "redux/types/ads";

export default function* adsSaga() {
  yield all([
    takeLatest(types.GET_ADS_ALL, getAdsAllSaga),
    takeLatest(types.GET_ADS_ALL_BY_LOCATION, getAdsAllByLocationSaga),
    takeLatest(types.GET_ADS_BY_ID, getAdsByIdSaga),
    takeLatest(types.CREATE_ADS, createAdsSaga),
    takeLatest(types.UPDATE_ADS, updateAdsSaga),
    takeLatest(types.REMOVE_ADS, removeAdsSaga),
  ]);
}
