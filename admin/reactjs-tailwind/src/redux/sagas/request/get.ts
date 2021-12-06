import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/typings";
import { setLoading } from "redux/actions/common";
import * as services from "services/request";
import {
  getAllRequestSuccess,
  getRequestByIdSuccess,
} from "redux/actions/request";

export function* getAllRequestSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getAllRequest,
    variables,
  );
  yield put(setLoading(false));

  const { getAllRequestAccept: result } = response?.data || {};
  if (result) {
    yield put(getAllRequestSuccess(result));
  }
}

export function* getRequestById(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getRequestById,
    variables,
  );
  yield put(setLoading(false));
  const { getRequestById: result } = response?.data || {};
  if (result) {
    yield put(getRequestByIdSuccess(result));
  }
}
