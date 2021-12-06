import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/typings";
import { showNotification } from "redux/actions/notification";
import { actionSuccess, setLoading } from "redux/actions/common";
import { getAllTransactionSuccess } from "redux/actions/transaction";
import * as services from "services/transaction";

export function* getAllTransactionSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getAllTransaction,
    variables,
  );
  yield put(setLoading(false));

  const { getAllTransaction: result } = response?.data || {};

  if (result) {
    yield put(getAllTransactionSuccess(result));
  }
}

export function* deleteTransactionSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.deleteTransactionById,
    variables,
  );
  yield put(setLoading(false));
  const { deleteTransactionById: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        message: "Xóa giao dịch thành công",
        title: "",
      }),
    );
  }
}
