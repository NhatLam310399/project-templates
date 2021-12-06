import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/typings";
import { showNotification } from "redux/actions/notification";
import { actionSuccess, setLoading } from "redux/actions/common";
import { getAllDocumentSuccess } from "redux/actions/document";
import * as services from "services/document";

export function* getAllDocumentSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getAllDocument,
    variables,
  );
  yield put(setLoading(false));

  const { getAllDocument: result } = response?.data || {};
  if (result) {
    yield put(getAllDocumentSuccess(result));
  }
}

export function* createDocumentSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.createDocument,
    variables,
  );
  yield put(setLoading(false));
  const { createDocument: result } = response?.data || {};
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

export function* updateDocumentSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.updateDocument,
    variables,
  );
  yield put(setLoading(false));
  const { updateDocument: result } = response?.data || {};
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

export function* deleteDocumentSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.deleteDocument,
    variables,
  );
  yield put(setLoading(false));
  const { deleteDocument: result } = response?.data || {};
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
