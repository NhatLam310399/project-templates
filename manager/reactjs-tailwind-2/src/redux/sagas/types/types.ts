import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/typings";
import { showNotification } from "redux/actions/notification";
import { actionSuccess, setLoading } from "redux/actions/common";
import { getTypesByCodeSuccess } from "redux/actions/types";
import * as services from "services/types";

export function* getTypesByCodeSaga(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getTypesByCode,
    variables,
  );
  yield put(setLoading(false));

  const { getTypesByCode: result } = response?.data || {};
  if (result) {
    yield put(getTypesByCodeSuccess(result));
  }
}

export function* createTypesSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.createTypes,
    variables,
  );
  yield put(setLoading(false));
  const { createTypes: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        message: "Thêm danh mục thành công",
        title: "",
      }),
    );
  }
}

export function* updateTypesSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.updateTypes,
    variables,
  );
  yield put(setLoading(false));
  const { updateTypes: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        message: "Cập nhật danh mục thành công",
        title: "",
      }),
    );
  }
}

export function* removeTypesSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.removeTypes,
    variables,
  );
  yield put(setLoading(false));
  const { removeTypes: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        message: "Xóa danh mục thành công",
        title: "",
      }),
    );
  }
}
