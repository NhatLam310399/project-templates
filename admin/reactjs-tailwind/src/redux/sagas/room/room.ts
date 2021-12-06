import { call, put } from "redux-saga/effects";
import { actionSuccess, setLoading } from "redux/actions/common";
import { getAllRoomSuccess } from "redux/actions/room";
import * as services from "services/room";
import { IGraphQLResponse } from "common/typings/App";
import { showNotification } from "redux/actions/notification";

export function* getAllRoomSaga(payload: any) {
  const variable = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(services.getAllRoom, variable);
  yield put(setLoading(false));
  const { getAllRoom: result } = response.data || {};
  if (result) {
    yield put(getAllRoomSuccess(result));
  }
}

export function* createRoomSaga(payload: any) {
  const variable = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(services.createRoom, variable);
  yield put(setLoading(false));
  const { createRoom: result } = response.data || {};
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

export function* updateRoomSaga(payload: any) {
  const variable = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(services.updateRoom, variable);
  yield put(setLoading(false));
  const { updateRoom: result } = response.data || {};
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

export function* deleteRoomByIdSaga(payload: any) {
  const variable = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.deleteRoomById,
    variable,
  );
  yield put(setLoading(false));
  const { deleteRoomById: result } = response.data || {};
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
