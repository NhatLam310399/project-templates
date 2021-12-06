import { call, put } from "redux-saga/effects";
import { IResponeHelpCenterLevel2, IGetHelpCenterLevel2 } from "typings";
import * as services from "services/help";
import { AxiosResponse } from "axios";
import { setLoading } from "redux/actions/common";
import { getAllHelpCenterLevel2Success } from "redux/actions/help";

export function* getAllHelpCenterLevel2Saga(payload: any) {
  console.log("payload", payload.payload);
  yield put(setLoading(true));
  const variables: IGetHelpCenterLevel2 = payload.payload;
  console.log(variables);
  const response: AxiosResponse<IResponeHelpCenterLevel2> = yield call(
    services.getAllHelpCenterLevel2,
    variables,
  );
  yield put(setLoading(false));
  console.log(response);
  const result = response?.data || {};
  if (result) {
    let payload = result.getAllHelpCenterLevel2
      ? result.getAllHelpCenterLevel2.results
      : [];
    yield put(getAllHelpCenterLevel2Success(payload));
  }
}
