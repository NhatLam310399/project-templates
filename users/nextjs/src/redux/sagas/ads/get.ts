import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "@common/typings";
import * as services from "@services/ads";
import {
  getAdAllSuccess,
  getAdsByLocationSuccess,
  getAdsJobPageSuccess,
} from "@redux/actions/ads";

export function* getAdsAll(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(services.getAdsAll, variables);
  const { getAdsAll: result } = response?.data || {};
  if (result) {
    yield put(getAdAllSuccess(result));
  }
}

export function* getAdsByLocation(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.getAdsByLocation,
    variables,
  );
  const { getAdsAllByLocation: result } = response?.data || {};
  if (result) {
    yield put(getAdsByLocationSuccess(result));
  }
}

export function* getAdsJobPage(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.getAdsByLocation,
    variables,
  );
  const { getAdsAllByLocation: result } = response?.data || {};
  if (result) {
    yield put(getAdsJobPageSuccess(result));
  }
}
