import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/typings";
import { setLoading } from "redux/actions/common";
import { getAllCategoriesSuccess } from "redux/actions/categories";
import * as services from "services/categories";

export function* getAllCategoriesSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getAllCategories,
    variables,
  );
  yield put(setLoading(false));

  const { getAllCategories: result } = response?.data || {};
  if (result) {
    yield put(getAllCategoriesSuccess(result));
  }
}
