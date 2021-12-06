import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/users";
import {
  createUserHasPermissions,
  deleteUserHasPermissions,
  getAllUserHasPermission,
  updateUserHasPermissions,
  setEnableForUser,
  setPermissionForUser,
  getAllUser,
  getUserById,
  setIsHighLightForUser,
} from "./users";

export default function* listUsers() {
  yield all([
    takeLatest(types.GET_ALL_USER, getAllUser),
    takeLatest(types.GET_USER_BY_ID, getUserById),
    takeLatest(types.GET_ALL_USER_HAS_PERMISSIONS, getAllUserHasPermission),
    takeLatest(types.CREATE_USER_HAS_PERMISSIONS, createUserHasPermissions),
    takeLatest(types.UPDATE_USER_HAS_PERMISSIONS, updateUserHasPermissions),
    takeLatest(types.DELETE_USER_HAS_PERMISSIONS, deleteUserHasPermissions),
    takeLatest(types.SET_ENABLE_FOR_USER, setEnableForUser),
    takeLatest(types.SET_PERMISSION_FOR_USER, setPermissionForUser),
    takeLatest(types.SET_IS_HIGHLIGHT_FOR_USER, setIsHighLightForUser),
  ]);
}
