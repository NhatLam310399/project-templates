import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/typings";
import { showNotification } from "redux/actions/notification";
import { actionSuccess, setLoading } from "redux/actions/common";
import { getAllProductSuccess } from "redux/actions/trade";
import * as services from "services/trade";

export function* getAllProductSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getAllProduct,
    variables,
  );
  yield put(setLoading(false));

  const { getAllProduct: result } = response?.data || {};
  if (result) {
    yield put(getAllProductSuccess(result));
  }
}

export function* createProductSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.createProduct,
    variables,
  );
  yield put(setLoading(false));

  const { createProduct: result } = response?.data || {};
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

export function* updateProductSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.updateProduct,
    variables,
  );
  yield put(setLoading(false));

  const { updateProduct: result } = response?.data || {};
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

export function* deleteProductSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.deleteProduct,
    variables,
  );
  yield put(setLoading(false));

  const { deleteProduct: result } = response?.data || {};
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
