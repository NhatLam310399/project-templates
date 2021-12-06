import { call, put } from "redux-saga/effects";
import { actionSuccess, setLoading } from "redux/actions/common";
import { getRoomByKaraokeSuccess } from "redux/actions/room";
import * as services from "services/room";
import { IGraphQLResponse } from "common/typings/App";
import { showNotification } from "redux/actions/notification";

export function* getRoomByKaraokeIdSaga(payload: any) {
  const variable = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getRoomByKaraokeId,
    variable,
  );
  yield put(setLoading(false));
  const { getRoomByKaraokeId: result } = response.data || {};
  if (result) {
    yield put(getRoomByKaraokeSuccess(result));
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
        title: "Thêm mới thành công",
        message: "",
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
        title: "Cập nhật thành công",
        message: "",
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
        title: "Xóa thành công",
        message: "",
      }),
    );
  }
}
