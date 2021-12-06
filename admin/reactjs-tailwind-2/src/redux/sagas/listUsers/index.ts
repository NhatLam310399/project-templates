import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/listUsers";
import {
    createUserHasPermissions,
    deleteUserHasPermissions,
    getAllUser,
    updateUserHasPermissions,
    setEnableForUserSaga,
    setPermissionByAdmin,
    getUserByRecruitment,
    getUserStatusViewByRecruitment
} from "./users";

export default function* listUsers() {
    yield all([
        takeLatest(types.GET_ALL_USER_HAS_PERMISSIONS, getAllUser),
        takeLatest(types.GET_USER_BY_RECRUITMENT, getUserByRecruitment),
        takeLatest(types.GET_USER_STATUS_VIEWED_BY_RECRUITMENT, getUserStatusViewByRecruitment),
        takeLatest(types.CREATE_USER_HAS_PERMISSIONS, createUserHasPermissions),
        takeLatest(types.UPDATE_USER_HAS_PERMISSIONS, updateUserHasPermissions),
        takeLatest(types.DELETE_USER_HAS_PERMISSIONS, deleteUserHasPermissions),
        takeLatest(types.SET_PERMISSION_FOR_USER, setPermissionByAdmin),
        takeLatest(types.SET_ENABLE_FOR_USER, setEnableForUserSaga),
    ]);
}
