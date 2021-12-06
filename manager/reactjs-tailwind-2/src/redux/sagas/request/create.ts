import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/typings";
import { showNotification } from "redux/actions/notification";
import { actionSuccess, setLoading } from "redux/actions/common";
import * as services from "services/request";

export function* createRequestSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.createRequest,
    variables,
  );
  yield put(setLoading(false));

  const { createRequest: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        message: "Chúc mừng. Bạn đã tạo yêu cầu thành công",
      }),
    );
  }
}
