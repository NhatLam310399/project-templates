import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/typings";
import { showNotification } from "redux/actions/notification";
import { actionSuccess, setLoading } from "redux/actions/common";
import * as services from "services/users";
import {
  getAllUserHasPermissionsSuccess,
  getAllUserSuccess,
  getUserSuccess,
} from "redux/actions/users";

export function* getAllUser(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(services.getAllUser, variables);
  yield put(setLoading(false));
  const { getAllUsers: result } = response?.data || {};
  if (result) {
    yield put(getAllUserSuccess(result));
  }
}

export function* getAllUserHasPermission(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getAllUserHasPermissions,
    variables,
  );
  yield put(setLoading(false));
  const { getAllUserHasPermissions: result } = response?.data || {};
  if (result) {
    yield put(getAllUserHasPermissionsSuccess(result));
  }
}

export function* getUserById(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getUserById,
    variables,
  );
  yield put(setLoading(false));
  const { getUserById: result } = response?.data || {};
  if (result) {
    yield put(getUserSuccess(result));
  }
}

export function* createUserHasPermissions(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.createUserByAdmin,
    variables,
  );
  yield put(setLoading(false));
  const { createUserByAdmin: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        message: "Tạo người dùng thành công",
      }),
    );
  }
}

export function* updateUserHasPermissions(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.updateUserByAdmin,
    variables,
  );
  yield put(setLoading(false));
  const { updateUserByAdmin: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        message: "Cập nhật người dùng thành công",
      }),
    );
  }
}

export function* deleteUserHasPermissions(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.deleteUserById,
    variables,
  );
  yield put(setLoading(false));
  const { deleteUser: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        message: "Xoá người dùng thành công",
      }),
    );
  }
}
export function* setEnableForUser(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.setEnableForUser,
    variables,
  );
  yield put(setLoading(false));
  const { setEnabledForUser: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        message: "Khoá/Mở khoá tài khoản thành công",
      }),
    );
  }
}
export function* setPermissionForUser(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.setPermissionForUser,
    variables,
  );
  yield put(setLoading(false));
  const { setPermissionForUser: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        message: "Thiết lập quyền thành công",
      }),
    );
  }
}
export function* setIsHighLightForUser(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.setIsHighlightForUser,
    variables,
  );
  yield put(setLoading(false));
  const { setHighlightUser: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        message: "Cập nhật nhân viên thành công",
      }),
    );
  }
}
