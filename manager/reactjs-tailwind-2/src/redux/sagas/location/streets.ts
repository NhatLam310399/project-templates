import { setLoading } from "redux/actions/common";
import { call, put } from "redux-saga/effects";
import { getStreetsSuccess } from "redux/actions/location";
import { IGraphQLResponse } from "common/typings";
import * as services from "services/location";

export function* getStreetsSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(services.getStreets, variables);
  yield put(setLoading(false));

  const { filterStreetType: result } = response?.data || {};
  if (result) {
    yield put(getStreetsSuccess(result));
  }
}
