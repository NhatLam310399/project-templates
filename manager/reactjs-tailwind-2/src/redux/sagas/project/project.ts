import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/typings";
import { showNotification } from "redux/actions/notification";
import { actionSuccess, setLoading } from "redux/actions/common";
import { getAllProjectSuccess } from "redux/actions/project";
import * as services from "services/project";

export function* getAllProjectSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getAllProject,
    variables,
  );
  yield put(setLoading(false));

  const { getAllProject: result } = response?.data || {};

  if (result) {
    yield put(getAllProjectSuccess(result));
  }
}

export function* createProjectSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.createProject,
    variables,
  );
  yield put(setLoading(false));
  const { createProject: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        message: "Thêm dự án thành công",
        title: "",
      }),
    );
  }
}

export function* updateProjectSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.updateProject,
    variables,
  );
  yield put(setLoading(false));
  const { updateProject: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        message: "Cập nhật dự án thành công",
        title: "",
      }),
    );
  }
}

export function* deleteProjectSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.deleteProjectById,
    variables,
  );
  yield put(setLoading(false));
  const { deleteProjectById: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        message: "Xóa dự án thành công",
        title: "",
      }),
    );
  }
}
