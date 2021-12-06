import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "@common/typings";
import * as services from "@services/record";
import {
  getAllRecordByUserSuccess,
  getRecordByIdSuccess,
  getRecordByUserIdSuccess,
} from "@redux/actions/record";

export function* getAllRecordSaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.getRecordByUserId,
    variables,
  );
  const { getRecordByUser: result } = response?.data || {};
  if (result) {
    yield put(getAllRecordByUserSuccess(result));
  }
}

export function* getRecordByIdSaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.getRecordById,
    variables,
  );
  const { getRecordById: result } = response?.data || {};

  if (result) {

    yield put(getRecordByIdSuccess(result));
  }
}

export function* getRecordByUserIdSaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.getRecordByUserId,
    variables,
  );
  const { getRecordByUser: result } = response?.data || {};

  if (result) {
    yield put(getRecordByUserIdSuccess(result));
  }
}
