import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "@common/typings";
import * as services from "@services/staticPages";
import {
  getAllStaticPagesSuccess,
  getStaticPageBySlugSuccess,
} from "@redux/actions/staticPages";

export function* getAllStaticPagesSaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.getAllPages,
    variables,
  );
  const { getAllPages: result } = response?.data || {};
  if (result) {
    yield put(getAllStaticPagesSuccess(result));
  }
}

export function* getStaticPageBySlugSaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.getPagesBySlug,
    variables,
  );
  const { getPagesBySlug: result } = response?.data || {};
  if (result) {
    yield put(getStaticPageBySlugSuccess(result));
  }
}
