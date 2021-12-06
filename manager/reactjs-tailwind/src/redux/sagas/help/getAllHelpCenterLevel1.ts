import { call, put } from "redux-saga/effects";
import { IResponeHelpCenterLevel1, IGetHelpCenterLevel1 } from "typings";
import * as services from "services/help";
import { AxiosResponse } from "axios";
import { setLoading } from "redux/actions/common";
import { getAllHelpCenterLevel1Success } from "redux/actions/help";

export function* getAllHelpCenterLevel1Saga(payload: any) {
  console.log("payload", payload.payload);
  yield put(setLoading(true));
  const variables: IGetHelpCenterLevel1 = payload.payload;
  const response: AxiosResponse<IResponeHelpCenterLevel1> = yield call(
    services.getAllHelpCenterLevel1,
    variables,
  );
  yield put(setLoading(false));
  console.log(response);
  const result = response?.data || {};
  if (result) {
    yield put(
      getAllHelpCenterLevel1Success(result.getAllHelpCenterLevel1.results),
    );
  }
}
