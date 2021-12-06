import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/transaction";
import { getAllTransactionSaga, deleteTransactionSaga } from "./transaction";

export default function* transactionSaga() {
  yield all([
    takeLatest(types.GET_ALL_TRANSACTION, getAllTransactionSaga),
    takeLatest(types.DELETE_TRANSACTION, deleteTransactionSaga),
  ]);
}
