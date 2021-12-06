import { call, put } from "redux-saga/effects";
import { getAllPagesSuccess } from "redux/actions/staticPage";
import { showNotification } from "redux/actions/notification";
import { setLoading, actionSuccess } from "redux/actions/common";
import * as services from "services/staticPage";
import { IGraphQLResponse } from "common/typings";

export function* getAllPagesSaga(payload: any) {
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(services.getAllPages);
  yield put(setLoading(false));

  const { getAllPages: result = null } = response?.data || {};
  if (result) {
    yield put(getAllPagesSuccess(result));
  }
}
export function* createPagesSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.createPages,
    variables,
  );
  yield put(setLoading(false));

  const { createPages: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        title: "Thành công",
        message: "",
      }),
    );
  }
}
export function* updatePagesSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.updatePages,
    variables,
  );
  yield put(setLoading(false));

  const { updatePages: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        title: "Thành công",
        message: "",
      }),
    );
  }
}
export function* removePagesSaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.removePages,
    variables,
  );
  const { removePages: result = null } = response?.data || {};

  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        title: "Thành công",
        message: "",
      }),
    );
  }
}
