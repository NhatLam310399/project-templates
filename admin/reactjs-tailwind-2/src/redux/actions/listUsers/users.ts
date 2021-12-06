import * as types from "redux/types/listUsers";
import {
    IGetAllUserHasPermissions,
    ICreateUserInput,
    IUpdateUserByAdminInput,
    IDeleteUser,
    ISetEnableForUser,
    ISetPermissionForUser,
    IUser,
    IGetUserByRecruitment,
} from "common/formatTypes";

export const getAllUserHasPermissions = (
    payload: IGetAllUserHasPermissions,
) => {
    return {
        type: types.GET_ALL_USER_HAS_PERMISSIONS,
        payload,
    };
};
export const getAllUserHasPermissionsSuccess = (
    payload: IGetAllUserHasPermissions,
) => ({
    type: types.GET_ALL_USER_HAS_PERMISSIONS_SUCCESS,
    payload,
});
export const createUserByAdmin = (payload: ICreateUserInput) => ({
    type: types.CREATE_USER_HAS_PERMISSIONS,
    payload,
});
export const getUserJustCreate = (payload: IUser) => ({
    type: types.GET_USER_JUST_CREATE,
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

export const setPermissionForUser = (payload: ISetPermissionForUser) => ({
    type: types.SET_PERMISSION_FOR_USER,
    payload,
});
export const getUsersByRecruitment = (payload: IGetUserByRecruitment) => ({
    type: types.GET_USER_BY_RECRUITMENT,
    payload,
});
export const getUsersStatusViewedByRecruitment = (payload: IGetUserByRecruitment) => ({
    type: types.GET_USER_STATUS_VIEWED_BY_RECRUITMENT,
    payload,
});
export const getUsersByRecruitmentSuccess = <T>(
    payload: T
) => ({
    type: types.GET_USER_BY_RECRUITMENT_SUCCESS,
    payload,
});
