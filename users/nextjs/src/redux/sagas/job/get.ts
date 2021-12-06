import { call, put } from "redux-saga/effects";

import { setLoading } from "@redux/actions/common";
import {
  getAllJobTypeSuccess,
  getAllJobLevelSuccess,
  getAllLevelPriceSuccess,
} from "@redux/actions/job";
import { IGraphQLResponse } from "@common/typings";
import * as services from "@services/job";

export function* getAllJobTypeSaga(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getAllJobType,
    variables,
  );
  yield put(setLoading(false));

  const { getAllJobType: results } = response?.data || {};

  if (results) {
    yield put(getAllJobTypeSuccess(results));
  }
}

export function* getAllJobLevelSaga(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getAllJobLevel,
    variables,
  );
  yield put(setLoading(false));

  const { getAllJobLevel: result } = response?.data || {};
  if (result) {
    yield put(getAllJobLevelSuccess(result));
  }
}

export function* getAllLevelPriceSaga(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getAllLevelPrice,
    variables,
  );
  yield put(setLoading(false));

  const { filterLevelPrice: results } = response?.data || {};

  if (results) {
    yield put(getAllLevelPriceSuccess(results));
  }
}
