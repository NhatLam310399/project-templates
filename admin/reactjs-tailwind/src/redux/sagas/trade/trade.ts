import { call, put } from "redux-saga/effects";
import { actionSuccess, setLoading } from "redux/actions/common";
import { getAllHotTradeSuccess, getAllTradeSuccess } from "redux/actions/trade";
import * as services from "services/trade";
import { IGraphQLResponse } from "common/typings/App";
import { showNotification } from "redux/actions/notification";

export function* getAllTradeSaga(payload: any) {
  const variable = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(services.getAllTrade, variable);
  yield put(setLoading(false));
  const { getAllTrade: result } = response.data || {};
  if (result) {
    yield put(getAllTradeSuccess(result));
  }
}

export function* getAllHotTradeSaga(payload: any) {
  const variable = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(services.getAllTrade, variable);
  yield put(setLoading(false));
  const { getAllTrade: result } = response.data || {};
  if (result) {
    yield put(getAllHotTradeSuccess(result));
  }
}

export function* createTradeSaga(payload: any) {
  const variable = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(services.createTrade, variable);
  yield put(setLoading(false));
  const { createTrade: result } = response.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        title: "",
        message: "Thêm mới thành công",
      }),
    );
  }
}

export function* updateTradeSaga(payload: any) {
  const variable = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(services.updateTrade, variable);
  yield put(setLoading(false));
  const { updateTrade: result } = response.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        title: "",
        message: "Cập nhật thành công",
      }),
    );
  }
}

export function* deleteTradeSaga(payload: any) {
  const variable = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(services.deleteTrade, variable);
  yield put(setLoading(false));
  const { deleteTrade: result } = response.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        title: "",
        message: "Xoá thành công",
      }),
    );
  }
}
