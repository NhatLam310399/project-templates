/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { call, put } from "redux-saga/effects";
import { getAdsAllSuccess, getAdsSuccess } from "redux/actions/ads";
import { showNotification } from "redux/actions/notification";
import * as adsService from "services/ads";
import { IGraphQLResponse } from "typings";
import { actionSuccess, setLoading } from "redux/actions/common";

export function* getAdsAllSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    adsService.getAdsAll,
    variables,
  );
  yield put(setLoading(false));

  const { getAdsAll: result = null } = response?.data || {};
  if (result) {
    yield put(getAdsAllSuccess(result));
  }
}

export function* getAdsAllByLocationSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    adsService.getAdsAllByLocation,
    variables,
  );
  yield put(setLoading(false));

  const { getAdsAllByLocation: result = null } = response?.data || {};
  if (result) {
    yield put(getAdsAllSuccess(result));
  }
}

export function* getAdsByIdSaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    adsService.getAdsById,
    variables,
  );
  const { getAdsById: result = null } = response?.data || {};
  if (result) {
    yield put(getAdsSuccess(result));
  }
}

export function* createAdsSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    adsService.createAds,
    variables,
  );
  yield put(setLoading(false));
  const { createAds: result = null } = response?.data || {};
  if (result) {
    yield put(actionSuccess());

    yield put(
      showNotification({
        type: "success",
        title: "Thành công",
        message: "",
      }),
    );
  }
}

export function* updateAdsSaga(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    adsService.updateAds,
    variables,
  );
  yield put(setLoading(false));
  const { updateAds: result = null } = response?.data || {};
  if (result) {
    yield put(actionSuccess());

    yield put(
      showNotification({
        type: "success",
        title: "Thành công",
        message: "",
      }),
    );
  }
}

export function* removeAdsSaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    adsService.removeAds,
    variables,
  );
  const { removeAds: result = null } = response?.data || {};
  if (result) {
    yield put(actionSuccess());

    yield put(
      showNotification({
        type: "success",
        title: "Thành công",
        message: "",
      }),
    );
  }
}
