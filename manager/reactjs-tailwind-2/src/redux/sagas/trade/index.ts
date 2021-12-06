import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/trade";

import {
  createProductSaga,
  deleteProductSaga,
  getAllProductSaga,
  updateProductSaga,
} from "./product";

import {
  createTradeSaga,
  deleteTradeSaga,
  getAllTradeSaga,
  updateTradeSaga,
} from "./trade";

export default function* tradeSaga() {
  yield all([
    takeLatest(types.GET_ALL_PRODUCT, getAllProductSaga),
    takeLatest(types.CREATE_PRODUCT, createProductSaga),
    takeLatest(types.UPDATE_PRODUCT, updateProductSaga),
    takeLatest(types.DELETE_PRODUCT, deleteProductSaga),

    takeLatest(types.GET_ALL_TRADE, getAllTradeSaga),
    takeLatest(types.CREATE_TRADE, createTradeSaga),
    takeLatest(types.UPDATE_TRADE, updateTradeSaga),
    takeLatest(types.DELETE_TRADE, deleteTradeSaga),
  ]);
}
