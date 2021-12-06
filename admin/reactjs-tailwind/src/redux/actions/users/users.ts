import * as types from "redux/types/users";
import {
  IGetAllUserHasPermissions,
  ICreateUserByAdmin,
  IUpdateUserByAdminInput,
  IDeleteUser,
  ISetEnableForUser,
  ISetPerMissionForUser,
  IGetAllUser,
  ISetIsHighlightForUser,
  IById,
} from "common/typings";

export const getAllUser = (payload: IGetAllUser) => ({
  type: types.GET_ALL_USER,
  payload,
});

export const getAllUserSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_USER_SUCCESS,
  payload,
});

export const getAllUserHasPermissions = (
  payload: IGetAllUserHasPermissions,
) => ({
  type: types.GET_ALL_USER_HAS_PERMISSIONS,
  payload,
});

export const getAllUserHasPermissionsSuccess = (
  payload: IGetAllUserHasPermissions,
) => ({
  type: types.GET_ALL_USER_HAS_PERMISSIONS_SUCCESS,
  payload,
});

export const getUserById = (payload: IById) => ({
  type: types.GET_USER_BY_ID,
  payload,
});

export const getUserSuccess = <T>(payload: T) => ({
  type: types.GET_USER_SUCCESS,
  payload,
});

export const createUserByAdmin = (payload: ICreateUserByAdmin) => ({
  type: types.CREATE_USER_HAS_PERMISSIONS,
  payload,
});
export const updateUserByAdmin = (payload: IUpdateUserByAdminInput) => ({
  type: types.UPDATE_USER_HAS_PERMISSIONS,
  payload,
});
export const deleteUser = (payload: IDeleteUser) => ({
  type: types.DELETE_USER_HAS_PERMISSIONS,
  payload,
});
export const setEnableForUser = (payload: ISetEnableForUser) => ({
  type: types.SET_ENABLE_FOR_USER,
  payload,
});
export const setPermissionForUser = (payload: ISetPerMissionForUser) => ({
  type: types.SET_PERMISSION_FOR_USER,
  payload,
});

export const setIsHighlightForUser = (payload: ISetIsHighlightForUser) => ({
  type: types.SET_IS_HIGHLIGHT_FOR_USER,
  payload,
});
