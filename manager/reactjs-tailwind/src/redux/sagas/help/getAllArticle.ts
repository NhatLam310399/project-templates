import { call, put } from "redux-saga/effects";
import { IResponeArticle, IGetArticle } from "typings";
import * as services from "services/help";
import { AxiosResponse } from "axios";
import { setLoading } from "redux/actions/common";
import { getAllArticleSuccess } from "redux/actions/help";

export function* getAllArticle(payload: any) {
  console.log("payload", payload.payload);
  yield put(setLoading(true));
  const variables: IGetArticle = payload.payload;
  const response: AxiosResponse<IResponeArticle> = yield call(
    services.getAllArticle,
    variables,
  );
  yield put(setLoading(false));
  console.log(response);
  const result = response?.data || {};
  if (result) {
    yield put(getAllArticleSuccess(result.getAllArticle.results));
  }
}
