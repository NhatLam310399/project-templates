/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { call, put } from "redux-saga/effects";
import { getAllClipArtSuccess } from "redux/actions/clipArt";
import * as services from "services/clipArt";
import { IGraphQLResponse } from "typings";
import { actionSuccess, setLoading } from "redux/actions/common";

export function* getAllClipArt(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getAllClipArt,
    variables,
  );
  yield put(setLoading(false));

  const { getAllClipArt: result } = response?.data || {};
  if (result) {
    yield put(getAllClipArtSuccess(result));
  }
}