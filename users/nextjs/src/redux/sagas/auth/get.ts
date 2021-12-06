import { call, put } from "redux-saga/effects";

import * as services from "@services/auth";
import { IGraphQLResponse } from "@common/typings";
import { showNotification } from "@components/ToastNotification";
import { getTokenSuccess, refreshTokenSuccess } from "@redux/actions/auth";
import { actionSuccess } from "@redux/actions/common";

export function* getToken(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.getAccessToken,
    variables,
  );
  const result = response?.data;

  const method = variables.loginMethod;
  const message =
    method === "facebook" || method === "google"
      ? `Địa chỉ email hoặc số điện thoại đăng ký ${method} đã tồn tại, vui lòng thử lại !`
      : "Đã xảy ra lỗi trong quá trình đăng nhập, vui lòng thử lại !";
  if (result) {
    yield put(getTokenSuccess(result));
    if (method !== "phone") {
      showNotification({
        type: "success",
        message: "Đăng nhập thành công!",
      });
    }
  } else {
    showNotification({
      type: "error",
      message: message,
      title: "Đã xảy ra lỗi",
    });
  }
}

export function* refreshToken() {
  const response: IGraphQLResponse = yield call(services.refreshToken);
  const { refreshToken: result } = response?.data || {};
  if (result) {
    yield put(refreshTokenSuccess(result));
  }
}
