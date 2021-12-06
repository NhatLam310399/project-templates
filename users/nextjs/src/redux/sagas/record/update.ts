import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "@common/typings";
import * as services from "@services/record";
import { setLoading, actionSuccess } from "@redux/actions/common";
import { showNotification } from "@components/ToastNotification";

export function* updateRecordSaga(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.updateRecord,
    variables,
  );
  yield put(setLoading(false));
  const { updateRecord: result } = response?.data || {};

  if (!result) {
    showNotification({
      type: "error",
      message: "Cập nhật hồ sơ thất bại",
    });
  }

  if (result) {
    showNotification({
      type: "success",
      message: "Cập nhật hồ sơ thành công!",
    });
    yield put(actionSuccess());
  }
}
