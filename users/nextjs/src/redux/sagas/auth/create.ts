import { put, call } from "redux-saga/effects";

import { setLoading, actionSuccess } from "@redux/actions/common";
import { IGraphQLResponse } from "@common/typings";
import * as services from "@services/auth";
import { showNotification } from "@components/ToastNotification";

export function* createCandidate(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.createCandidate,
    variables,
  );
  yield put(setLoading(false));

  const { createCandidate: result } = response?.data || {};

  if (result) {
    // yield put(actionSuccess());
  } else {
    showNotification({
      type: "error",
      title: "Thông báo",
      message: "Số điện thoại hoặc email của bạn đã được đăng ký",
    });
  }
}
