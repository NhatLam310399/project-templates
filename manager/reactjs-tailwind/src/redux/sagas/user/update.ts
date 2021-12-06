import { call, put } from "redux-saga/effects";
import { toast } from "react-toastify";
import { setLoading, actionSuccess } from "redux/actions/common";
import * as services from "services/user";
import { IGraphQLResponse } from "typings";

export function* updatePassword(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.updatePassword,
    variables,
  );
  yield put(setLoading(false));
  const { updatePasswordUser: result } = response?.data;
  if (result) {
    yield put(actionSuccess());
    toast.dark("Change password success !", { type: toast.TYPE.SUCCESS });
  } else {
    toast.dark("Change password failed, please try again", {
      type: toast.TYPE.ERROR,
    });
  }
}
