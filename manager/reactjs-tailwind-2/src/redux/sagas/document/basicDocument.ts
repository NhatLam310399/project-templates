import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/typings";
import { showNotification } from "redux/actions/notification";
import { actionSuccess, setLoading } from "redux/actions/common";
import { getAllBasicDocumentSuccess } from "redux/actions/document";
import * as services from "services/document";

export function* getAllBasicDocumentSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getAllBasicDocument,
    variables,
  );
  yield put(setLoading(false));

  const { getAllBasicDocument: result } = response?.data || {};
  if (result) {
    yield put(getAllBasicDocumentSuccess(result));
  }
}

export function* createBasicDocumentSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.createBasicDocument,
    variables,
  );
  yield put(setLoading(false));
  const { createBasicDocument: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        message: "Thêm tài liệu thành công",
        title: "",
      }),
    );
  }
}

export function* updateBasicDocumentSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.updateBasicDocument,
    variables,
  );
  yield put(setLoading(false));
  const { updateBasicDocument: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        message: "Cập nhật tài liệu thành công",
        title: "",
      }),
    );
  }
}

export function* deleteBasicDocumentSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.deleteBasicDocument,
    variables,
  );
  yield put(setLoading(false));
  const { deleteBasicDocument: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        message: "Xóa tài liệu thành công",
        title: "",
      }),
    );
  }
}
