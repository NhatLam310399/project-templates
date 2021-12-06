import { call, put } from "redux-saga/effects";
import { getSeoWebsiteSuccess } from "@redux/actions/contentWebsite";
import * as services from "@services/contentWebsite";
import { IGraphQLResponse } from "@common/typings";

export function* getSeoWebsiteSaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(services.getSeo, variables);
  const { getSeo: results } = response?.data || {};
  if (results) {
    yield put(getSeoWebsiteSuccess(results));
  }
}
