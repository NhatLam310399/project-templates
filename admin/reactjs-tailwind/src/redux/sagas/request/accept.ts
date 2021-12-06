import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/typings";
import { showNotification } from "redux/actions/notification";
import { actionSuccess, setLoading } from "redux/actions/common";
import * as services from "services/request";

export function* acceptRequest(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.acceptRequest,
    variables,
  );
  yield put(setLoading(false));

  const { acceptRequest: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        message: "Duyệt yêu cầu thành công!",
      }),
    );
  }
}
