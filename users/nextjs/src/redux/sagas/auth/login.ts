import { call, put } from "redux-saga/effects";
import { IGraphQLResponse, ILoginInput } from "@common/typings";
import * as services from "@services/auth";
import { loginSuccess } from "@redux/actions/auth";
import { setLoading } from "@redux/actions/common";
import { showNotification } from "@components/ToastNotification";

export function* login(payload: any) {
  const variables: ILoginInput = {
    user: payload.payload.user,
  };
  const permission = payload.payload.permission;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.loginWithPhoneNumber,
    variables,
  );
  yield put(setLoading(false));
  const { login: result } = response?.data || {};
  if (!result) {
    showNotification({
      type: "error",
      title: "Thông báo",
      message: "Sai tên đăng nhập hoặc mật khẩu !",
    });
  }
  if (result) {
    if (permission === result.userInfo.permission) {
      showNotification({
        type: "success",
        title: "Thông báo",
        message: "Đăng nhập thành công!",
      });
      yield put(loginSuccess(result));
    } else {
      showNotification({
        type: "error",
        title: "Thông báo",
        message: "Tài khoản không phải là tài khoản người dùng !",
      });
    }
  }
}
