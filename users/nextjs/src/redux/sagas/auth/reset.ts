import { call, put } from "redux-saga/effects";
import { setLoading, actionSuccess } from "@redux/actions/common";
import * as services from "@services/auth";
import { showNotification } from "@components/ToastNotification";

export function* resetPassword(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response = yield call(services.resetPassword, variables);
  yield put(setLoading(false));

  const { resetPassword: result } = response?.data || {};

  if (result) {
    yield put(actionSuccess());
  } else {
    showNotification({
      type: "success",
      title: "Thông báo",
      message: "Có lỗi xảy ra trong quá trình đặt lại mật khẩu",
    });
  }
}
