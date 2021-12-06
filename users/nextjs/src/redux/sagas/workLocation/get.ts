import { put, call } from "redux-saga/effects";

import {
  getWorkLocationByCompanySuccess,
  getWorkLocationSuccess,
} from "@redux/actions/workLocation";
import { setLoading, actionSuccess } from "@redux/actions/common";
import { IGraphQLResponse } from "@common/typings";
import * as services from "@services/workLocation";

export function* getWorkLocation(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getAllWorkLocation,
    variables,
  );
  yield put(setLoading(false));

  const { getAllWorkLocation: result } = response?.data || {};

  if (result) {
    yield put(getWorkLocationSuccess(result));
  }
}

export function* getWorkLocationByCompany(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getWorkLocationByCompany,
    variables,
  );
  yield put(setLoading(false));

  const { getWorkLocationByCompany: results } = response?.data || {};

  if (results) {
    yield put(getWorkLocationByCompanySuccess(results));
  }
}

export function* createWorkLocation(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.createWorkLocation,
    variables,
  );
  yield put(setLoading(true));

  const { createWorkLocation: result } = response?.data || {};

  if (result) {
    yield put(actionSuccess());
  }
}

export function* deleteWorkLocation(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.deleteWorkLocation,
    variables,
  );
  yield put(setLoading(true));

  const { deleteWorkLocation: result } = response?.data || {};

  if (result) {
    yield put(actionSuccess());
  }
}

export function* updateWorkLocation(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.updateWorkLocation,
    variables,
  );
  yield put(setLoading(true));

  const { updateWorkLocation: result } = response?.data || {};

  if (result) {
    yield put(actionSuccess());
  }
}
