import { call, put } from "redux-saga/effects";
import {
  getAllCategoryLv1Success,
  getAllCategoryLv2Success,
  getAllTagMenuSuccess,
} from "redux/actions/category";
import { startLoading, stopLoading } from "redux/actions/_config";
import * as services from "services/category";
import { IGraphQLResponse } from "typings";
import * as types from "redux/types/category";

export function* getAllCategoryLevel1(payload: any) {
  const variables = payload.payload;
  yield put(startLoading(types.GET_ALL_CATEGORY_LV1));
  const response: IGraphQLResponse = yield call(
    services.getAllCategoryLv1,
    variables,
  );
  yield put(stopLoading(types.GET_ALL_CATEGORY_LV1));
  const { getAllCategoryLevel1: result = null } = response?.data || {};
  if (result) {
    yield put(getAllCategoryLv1Success(result));
  }
}

export function* getAllCategoryLevel2(payload: any) {
  const variables = payload.payload;
  yield put(startLoading(types.GET_ALL_CATEGORY_LV2));
  const response: IGraphQLResponse = yield call(
    services.getAllCategoryLv2,
    variables,
  );
  yield put(stopLoading(types.GET_ALL_CATEGORY_LV2));
  const { getAllCategoryLevel2: result = null } = response?.data || {};
  if (result) {
    yield put(getAllCategoryLv2Success(result));
  }
}
export function* getAllTagMenu(payload: any) {
  const variables = payload.payload;
  yield put(startLoading(types.GET_ALL_TAG_MENU));
  const response: IGraphQLResponse = yield call(
    services.getAllTagMenu,
    variables,
  );
  yield put(stopLoading(types.GET_ALL_TAG_MENU));
  const { getAllTagMenu: result = null } = response?.data || {};
  if (result) {
    yield put(getAllTagMenuSuccess(result));
  }
}
