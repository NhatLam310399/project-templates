import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/typings";
import { showNotification } from "redux/actions/notification";
import { actionSuccess, setLoading } from "redux/actions/common";
import { getAllMessageSuccess } from "redux/actions/message";
import * as services from "services/message";

export function* getAllMessageSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getAllMessage,
    variables,
  );
  yield put(setLoading(false));

  const { getAllMessage: result } = response?.data || {};
  if (result) {
    yield put(getAllMessageSuccess(result));
  }
}

export function* createMessageSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.createMessage,
    variables,
  );
  yield put(setLoading(false));

  const { createMessage: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    // yield put(
    //   showNotification({
    //     type: "success",
    //     message: "Thêm mới thành công",
    //   }),
    // );
  }
}

export function* updateMessageSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.updateMessage,
    variables,
  );
  yield put(setLoading(false));

  const { updateMessage: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    // yield put(
    //   showNotification({
    //     type: "success",
    //     message: "Cập nhật thành công",
    //   }),
    // );
  }
}

export function* deleteMessageByIdSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.deleteMessageById,
    variables,
  );
  yield put(setLoading(false));

  const { deleteMessageById: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    // yield put(
    //   showNotification({
    //     type: "success",
    //     message: "Xóa hành công",
    //   }),
    // );
  }
}
