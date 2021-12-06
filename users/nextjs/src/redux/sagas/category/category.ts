import { call, put, all } from "redux-saga/effects";
import {
  IGetCategoryLevel2,
  IGetCategoryLevel1,
  IGraphQLResponse,
} from "@common/typings";
import * as services from "@services/category";
import { getAllCategorySuccess } from "@redux/actions/category";
import { setLoading } from "@redux/actions/common";
import {
  getAllCategoryLevel1Success,
  getAllCategoryLevel2Success,
} from "@redux/actions/category";

export function* getAllCategoryLevel1(payload: any) {
  const variables = payload?.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getCategoryLevel1,
    variables,
  );
  yield put(setLoading(false));

  const { getAllCategoryLevel1: results } = response?.data || {};
  if (results) {
    yield put(getAllCategoryLevel1Success(results));
  }
}

export function* getAllCategoryLevel2(payload: any) {
  const variables = payload?.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getCategoryLevel2,
    variables,
  );
  yield put(setLoading(false));

  const { getAllCategoryLevel2: results } = response?.data || {};
  if (results) {
    yield put(getAllCategoryLevel2Success(results));
  }
}
