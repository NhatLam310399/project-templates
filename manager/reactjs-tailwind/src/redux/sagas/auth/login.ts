import { call, put } from "redux-saga/effects";
import { toast } from "react-toastify";
import { IGraphQLResponse, ILogin } from "typings";
import * as services from "services/auth";
import { loginSuccess } from "redux/actions/auth";
import { setLoading } from "redux/actions/common";
export function* login(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(services.login, variables);
  yield put(setLoading(false));
  const { login: result } = response?.data;
  if (result) {
    toast.dark("Login success !", { type: toast.TYPE.SUCCESS });
    yield put(loginSuccess(result));
  } else {
    toast.dark("Email or password incorrect, please try again !", {
      type: toast.TYPE.ERROR,
    });
  }
}
