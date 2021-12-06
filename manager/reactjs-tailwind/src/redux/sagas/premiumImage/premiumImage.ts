import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "typings";
import * as services from "services/premiumImage";
import { getAllPremiumSuccess } from "redux/actions/premiumImage";

export function* getAllPremiumImage(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.getAllPremiumImage,
    variables,
  );
  const { getAllPremiumImage: result } = response?.data || {};
  if (result) {
    yield put(getAllPremiumSuccess(result));
  }
}