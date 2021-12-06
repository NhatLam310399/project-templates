import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/orders";
import { getAllOrdersSaga, deleteOrderSaga } from "./orders";

export default function* transactionSaga() {
  yield all([
    takeLatest(types.GET_ALL_ORDERS, getAllOrdersSaga),
    takeLatest(types.DELETE_ORDER, deleteOrderSaga),
  ]);
}
