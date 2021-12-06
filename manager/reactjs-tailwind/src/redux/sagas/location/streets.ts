import { call, put } from "redux-saga/effects";
import { actionSuccess, setLoading } from "redux/actions/common";
import { getStreetsSuccess, getStreetSuccess } from "redux/actions/location";
import { showNotification } from "redux/actions/notification";
import { IGraphQLResponse } from "typings";
import * as services from "services/location";

export function* getStreetsSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(services.getStreets, variables);
  yield put(setLoading(false));

  const { filterStreetType: result } = response?.data || {};
  if (result) {
    yield put(getStreetsSuccess(result));
  }
}

export function* getStreetByIdSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getStreetById,
    variables,
  );
  yield put(setLoading(false));

  const { getStreetById: result } = response?.data || {};
  if (result) {
    yield put(getStreetSuccess(result));
  }
}

export function* createStreetSaga(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.createStreet,
    variables,
  );
  yield put(setLoading(false));
  const { createStreet: result } = response?.data || {};

  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        title: "Thành công",
        message: "Tạo đường thành công",
      }),
    );
  }
}

export function* updateStreetSaga(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.updateStreet,
    variables,
  );
  yield put(setLoading(false));

  const { updateStreet: result } = response?.data || {};

  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        title: "Thành công",
        message: "Cập nhật đường phố thành công",
      }),
    );
  }
}

export function* deleteStreetSaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.deleteStreet,
    variables,
  );
  const { deleteStreet: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        title: "Thành công",
        message: "Xóa đường phố thành công",
      }),
    );
  }
}
