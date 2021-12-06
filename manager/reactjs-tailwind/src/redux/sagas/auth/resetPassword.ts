import { call, put } from "redux-saga/effects";
import { toast } from "react-toastify";
import { IGraphQLResponse } from "typings";
import * as services from "services/auth";
import { setLoading, actionSuccess } from "redux/actions/common";

export function* resetPassword(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.resetPassword,
    variables,
  );
  yield put(setLoading(false));
  const { resetPassword: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
  } else {
    toast.dark("Your email doesn't exist, please try again !", {
      type: toast.TYPE.ERROR,
    });
  }
}
