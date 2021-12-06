import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "@common/typings";
import * as services from "@services/position";
import { getAllPositionSuccess } from "@redux/actions/position";

export function* positionSaga(payload: any) {
  const response: IGraphQLResponse = yield call(services.getAllPosition);
  const { getAllPosition: result } = response?.data || {};
  if (result) {
    yield put(getAllPositionSuccess(result));
  }
}
