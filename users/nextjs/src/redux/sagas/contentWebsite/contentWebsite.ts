import { call, put } from "redux-saga/effects";
import { getAllContentWebsiteSuccess } from "@redux/actions/contentWebsite";
import * as services from "@services/contentWebsite";
import { IGraphQLResponse } from "@common/typings";

export function* getContentWebsiteSaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.getAllContentWebsite,
    payload,
  );
  const { getAllContentWebsite: results } = response?.data || {};
  if (results) {
    yield put(getAllContentWebsiteSuccess(results));
  }
}
