import { put, call } from "redux-saga/effects";

import { getAllBenefitSuccess } from "@redux/actions/benefit";
import { setLoading } from "@redux/actions/common";
import { IGraphQLResponse } from "@common/typings";
import * as services from "@services/benefit";

export function* getAllBenefit(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));

  const response: IGraphQLResponse = yield call(
    services.getAllBenefit,
    variables,
  );
  yield put(setLoading(false));

  const { getAllBenefit: result } = response?.data || {};

  if (result) {
    yield put(getAllBenefitSuccess(result));
  }
}
