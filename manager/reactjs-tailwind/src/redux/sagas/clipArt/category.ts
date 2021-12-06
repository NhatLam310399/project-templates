/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { call, put } from "redux-saga/effects";
import { getAllCategorySuccess } from "redux/actions/clipArt";
import * as services from "services/clipArt";
import { IGraphQLResponse } from "typings";
import { actionSuccess, setLoading } from "redux/actions/common";

export function* getAllCategory(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getAllCategory,
    variables,
  );
  yield put(setLoading(false));

  const { getAllCategory: result } = response?.data || {};
  if (result) {
    yield put(getAllCategorySuccess(result));
  }
}