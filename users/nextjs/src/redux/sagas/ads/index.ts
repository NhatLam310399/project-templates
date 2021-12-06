import * as types from "@redux/types/ads";
import { all, takeLatest } from "redux-saga/effects";
import { getAdsAll, getAdsByLocation, getAdsJobPage } from "./get";

export default function* adsSaga() {
  yield all([
    takeLatest(types.GET_ADS_ALL, getAdsAll),
    takeLatest(types.GET_ADS_BY_LOCATION, getAdsByLocation),
    takeLatest(types.GET_ADS_JOB_PAGE, getAdsJobPage),
  ]);
}
