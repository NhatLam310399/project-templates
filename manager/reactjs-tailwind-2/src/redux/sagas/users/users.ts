import { call, put } from "redux-saga/effects";
import { setLoading, actionSuccess } from "redux/actions/common";
import { showNotification } from "redux/actions/notification";
import { getUserSuccess } from "redux/actions/users";
import * as services from "services/user";
import { IGraphQLResponse } from "common/typings/App";

export function* getUserByIdSaga(payload: any) {
  const variable = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(services.getUserById, variable);
  yield put(setLoading(false));
  const { getUserById: result } = response.data || {};
  if (result) {
    yield put(getUserSuccess(result));
  }
}
export function* updateUserProfile(payload: any) {
  const variable = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.updateUserProfile,
    variable,
  );
  yield put(setLoading(false));
  const { updateUserProfile: result } = response.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        title: "",
        message: "Cập nhật thông tin thành công",
      }),
    );
  }
}
