import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "@common/typings";
import * as services from "@services/blog";
import { getAllBlogSuccess, getBlogBySlugSuccess } from "@redux/actions/blog";

export function* getAllBlogSaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(services.getAllBlog, variables);
  const { getAllCareerCounseling: result } = response?.data || {};
  if (result) {
    yield put(getAllBlogSuccess(result));
  }
}

export function* getBlogBySlugSaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.getBlogBySlug,
    variables,
  );
  const { getCareerCounselingBySlug: result } = response?.data || {};
  if (result) {
    yield put(getBlogBySlugSuccess(result));
  }
}
