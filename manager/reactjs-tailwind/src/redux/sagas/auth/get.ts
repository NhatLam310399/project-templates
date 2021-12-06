import { call, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { IAccount, IGetToken } from "typings";
import * as services from "services/auth";
import { getTokenSuccess } from "redux/actions/auth";
import { actionSuccess, setLoading } from "redux/actions/common";

export function* getToken(payload: any) {
  yield put(setLoading(true));
  const variables: IGetToken = payload.payload;
  const response: AxiosResponse<IAccount> = yield call(
    services.getAccessToken,
    variables,
  );
  yield put(setLoading(false));
  const result = response?.data || {};
  const { loginMethod } = variables;
  if (result) {
    yield put(getTokenSuccess(result));
    yield put(actionSuccess());
  } else {
    toast(`Login with ${loginMethod} failed, please try again`, {
      type: toast.TYPE.ERROR,
    });
  }
}
