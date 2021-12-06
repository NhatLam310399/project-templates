import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/typings";
import { showNotification } from "redux/actions/notification";
import { actionSuccess, setLoading } from "redux/actions/common";
import {
  getAllKaraokeSuccess,
  getKaraokeSuccess,
  getAllKaraokeHighlightSuccess,
} from "redux/actions/karaoke";
import * as services from "services/karaoke";

export function* getAllKaraokeSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getAllKaraoke,
    variables,
  );
  yield put(setLoading(false));

  const { getAllKaraoke: result } = response?.data || {};
  if (result) {
    yield put(getAllKaraokeSuccess(result));
  }
}

export function* getAllKaraokeHighlightSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getAllKaraokeHighlight,
    variables,
  );
  yield put(setLoading(false));

  const { getAllKaraokeHighlight: result } = response?.data || {};
  if (result) {
    yield put(getAllKaraokeHighlightSuccess(result));
  }
}

export function* getKaraokeByIdSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getKaraokeById,
    variables,
  );
  yield put(setLoading(false));

  const { getKaraokeById: result } = response?.data || {};
  if (result) {
    yield put(getKaraokeSuccess(result));
  }
}

export function* createKaraokeSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.createKaraoke,
    variables,
  );
  yield put(setLoading(false));

  const { createKaraoke: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        message: "Thêm mới thành công",
      }),
    );
  }
}

export function* updateKaraokeSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.updateKaraoke,
    variables,
  );
  yield put(setLoading(false));

  const { updateKaraoke: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        message: "Cập nhật thành công",
      }),
    );
  }
}

export function* deleteKaraokeByIdSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.deleteKaraokeById,
    variables,
  );
  yield put(setLoading(false));

  const { deleteKaraokeById: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        message: "Xóa hành công",
      }),
    );
  }
}

export function* deleteAllKaraokeSaga() {
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(services.deleteAllKaraoke);
  yield put(setLoading(false));

  const { deleteAllKaraoke: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        message: "Xóa hành công",
      }),
    );
  }
}

export function* changeCompanyToKaraokeSaga(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.changeCompanyToKaraoke,
    variables,
  );
  yield put(setLoading(false));

  const { changeCompanytoKaraoke: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        message: "Chuyển đổi thành công!",
      }),
    );
  }
}

export function* changeKaraokeToCompanySaga(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.changeKaraokeToCompany,
    variables,
  );
  yield put(setLoading(false));

  const { changeKaraoketoCompany: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        message: "Chuyển đổi thành công!",
      }),
    );
  }
}
