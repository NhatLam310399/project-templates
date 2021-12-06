import { call, put } from "redux-saga/effects";
import { setLoading } from "@redux/actions/common";
import { IGraphQLResponse } from "@common/typings";
import * as services from "@services/tag";
import { getAllTagSuccess } from "@redux/actions/tag";

export function* getAllTag(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(services.getAllTag, variables);
  yield put(setLoading(true));

  const { getAllTag: result } = response.data || {};

  if (result) {
    yield put(getAllTagSuccess(result));
  }
}
