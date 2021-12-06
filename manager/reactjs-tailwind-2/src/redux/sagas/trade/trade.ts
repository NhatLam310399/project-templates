import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/typings";
import { showNotification } from "redux/actions/notification";
import { actionSuccess, setLoading } from "redux/actions/common";
import { getAllTradeSuccess } from "redux/actions/trade";
import * as services from "services/trade";

export function* getAllTradeSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getAllTrade,
    variables,
  );
  yield put(setLoading(false));

  const { getAllTrade: result } = response?.data || {};
  if (result) {
    yield put(getAllTradeSuccess(result));
  }
}

export function* createTradeSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.createTrade,
    variables,
  );
  yield put(setLoading(false));

  const { createTrade: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        title: "Thêm mới thành công",
        message: "",
      }),
    );
  }
}

export function* updateTradeSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.updateTrade,
    variables,
  );
  yield put(setLoading(false));

  const { updateTrade: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        title: "Cập nhật thành công",
        message: "",
      }),
    );
  }
}

export function* deleteTradeSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.deleteTrade,
    variables,
  );
  yield put(setLoading(false));

  const { deleteTrade: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        title: "Xóa hành công",
        message: "",
      }),
    );
  }
}
