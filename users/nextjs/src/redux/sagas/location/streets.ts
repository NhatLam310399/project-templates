import { call, put } from "redux-saga/effects";
import { getStreetByProvinceAndDistrictSuccess } from "@redux/actions/location";
import { IGraphQLResponse } from "@common/typings";
import * as services from "@services/location";

export function* getStreetByProvinceAndDistrict(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(services.getStreets, variables);

  const { getStreetByProvinceAndDistrict: result } = response?.data || {};
  if (result) {
    yield put(getStreetByProvinceAndDistrictSuccess(result));
  }
}
