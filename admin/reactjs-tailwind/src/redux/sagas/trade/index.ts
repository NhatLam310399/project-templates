import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/trade";
import {
  createTradeSaga,
  deleteTradeSaga,
  getAllTradeSaga,
  getAllHotTradeSaga,
  updateTradeSaga,
} from "./trade";

export default function* tradeSaga() {
  yield all([
    takeLatest(types.GET_ALL_TRADE, getAllTradeSaga),
    takeLatest(types.GET_ALL_HOT_TRADE, getAllHotTradeSaga),
    takeLatest(types.CREATE_TRADE, createTradeSaga),
    takeLatest(types.UPDATE_TRADE, updateTradeSaga),
    takeLatest(types.DELETE_TRADE, deleteTradeSaga),
  ]);
}
