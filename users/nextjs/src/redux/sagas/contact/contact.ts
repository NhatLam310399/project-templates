import { IGraphQLResponse } from "@common/typings";
import { call, put } from "redux-saga/effects";
import * as services from "@services/contact";
import { setLoading, actionSuccess } from "@redux/actions/common";

export function* createContact(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.createContact,
    variables,
  );
  yield put(setLoading(false));
  const { createContact: result } = response?.data || {};

  if (result) {
    yield put(actionSuccess());
  }
}
