import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/typings";
import { showNotification } from "redux/actions/notification";
import { actionSuccess, setLoading } from "redux/actions/common";
import * as services from "services/orders";
import { getAllOrdersSuccess } from "redux/actions/orders";

export function* getAllOrdersSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getAllOrders,
    variables,
  );
  yield put(setLoading(false));

  const { getAllOrders: result } = response?.data || {};

  if (result) {
    yield put(getAllOrdersSuccess(result));
  }
}

export function* deleteOrderSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.deleteOrderById,
    variables,
  );
  yield put(setLoading(false));
  const { deleteOrderById: result } = response?.data || {};
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
