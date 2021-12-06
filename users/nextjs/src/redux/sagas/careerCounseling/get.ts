import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "@common/typings";
import * as services from "@services/careerCounseling";
import { getAllCareerCouselingSuccess } from "@redux/actions/careerCounseling";

export function* getAllCareerCounseling(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.getAllCarreerCounseling,
    variables,
  );
  const { getAllCareerCounseling: result } = response?.data || {};
  if (result) {
    yield put(getAllCareerCouselingSuccess(result));
  }
}
