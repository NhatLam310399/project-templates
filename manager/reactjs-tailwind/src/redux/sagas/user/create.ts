import { call, put } from "redux-saga/effects";
import { toast } from "react-toastify";
import { setLoading, actionSuccess } from "redux/actions/common";
import * as services from "services/user";
import { IGraphQLResponse } from "typings";

export function* createUserSaga(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(services.createUser, variables);
  yield put(setLoading(false));
  const { createUser: result } = response?.data;
  if (result) {
    yield put(actionSuccess());
    toast.dark("Register success !", { type: toast.TYPE.SUCCESS });
  } else {
    toast.dark("Register failed, please try again", { type: toast.TYPE.ERROR });
  }
}

export function* checkExistEmail(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.checkExistEmail,
    variables,
  );
  yield put(setLoading(false));
  const { isExistEmail: result } = response?.data;
  //result = false => email doesn't exist, allow to access
  if (!result) {
    console.log("success");
    yield put(actionSuccess());
  } else {
    toast.dark("Your email address already exists, please try again!", {
      type: toast.TYPE.ERROR,
    });
  }
}

export function* checkExistEmailOtherProvider(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.checkExistEmailOtherProvider,
    variables,
  );
  yield put(setLoading(false));
  const { isExistEmailOtherProvider: result } = response?.data;
  //result = false => email doesn't exist, allow to access
  if (!result) {
    yield put(actionSuccess());
  } else {
    console.log("response", response);
    toast.dark(
      "The account's email is already in use by another account, please try again!",
      { type: toast.TYPE.ERROR },
    );
  }
}
