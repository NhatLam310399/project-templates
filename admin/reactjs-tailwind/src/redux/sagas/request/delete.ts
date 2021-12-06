import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/typings";
import * as services from "services/request";
import { actionSuccess, setLoading } from "redux/actions/common";
import { showNotification } from "redux/actions/notification";

export function* deleteRequest(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.deleteRequest,
    variables,
  );
  yield put(setLoading(false));
  const { deleteRequestById: result } = response?.data || {};

  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        message: "Xoá yêu cầu thành công!",
      }),
    );
  }
}
