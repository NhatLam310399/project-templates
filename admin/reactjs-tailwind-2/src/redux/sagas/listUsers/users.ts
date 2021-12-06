import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/formatTypes";
import { showNotification } from "redux/actions/notification";
import { actionSuccess, resetAction, setLoading } from "redux/actions/common";
import * as services from "services/listUsers";
import {
    getAllUserHasPermissionsSuccess,
    getUserJustCreate,
    getUsersByRecruitmentSuccess
} from "redux/actions/listUsers";
import { t } from "language";

export function* getAllUser(payload: any) {
    const variables = payload.payload;
    const response: IGraphQLResponse = yield call(
        services.getAllUserHasPermissions,
        variables,
    );
    const { getAllUserHasPermissions: result } = response?.data || {};
    if (result) {
        yield put(getAllUserHasPermissionsSuccess(result));
    }
}
export function* getUserByRecruitment(payload: any) {
    const variables = payload.payload;
    const response: IGraphQLResponse = yield call(
        services.getUsersByRecruitment,
        variables,
    );
    const { getUserByRecruitment: result } = response?.data || {};
    if (result) {
        yield put(getUsersByRecruitmentSuccess(result));
    }
}
export function* getUserStatusViewByRecruitment(payload: any) {
    const variables = payload.payload;
    const response: IGraphQLResponse = yield call(
        services.getUsersStatusViewedByRecruitment,
        variables,
    );
    const { getUserStatusViewByRecruitment: result } = response?.data || {};
    if (result) {
        yield put(getUsersByRecruitmentSuccess(result));
    }
}

export function* createUserHasPermissions(payload: any) {
    const variables = payload.payload;
    const response: IGraphQLResponse = yield call(
        services.createUserByAdmin,
        variables,
    );
    const { createUserByAdmin: result } = response?.data || {};
    if (result) {
        yield put(getUserJustCreate(result));
        yield put(actionSuccess());
        yield put(
            showNotification({
                type: "success",
                title: t("common.create-success"),
                message: "",
            }),
        );
    }
}

export function* updateUserHasPermissions(payload: any) {
    const variables = payload.payload;
    const response: IGraphQLResponse = yield call(
        services.updateUserByAdmin,
        variables,
    );
    const { updateUserByAdmin: result } = response?.data || {};
    if (result) {
        yield put(actionSuccess());
        yield put(
            showNotification({
                type: "success",
                title: t("common.update-success"),
                message: "",
            }),
        );
    }
}

export function* deleteUserHasPermissions(payload: any) {
    const variables = payload.payload;
    const response: IGraphQLResponse = yield call(
        services.deleteUserById,
        variables,
    );
    const { deleteUser: result } = response?.data || {};
    if (result) {
        yield put(actionSuccess());
        yield put(
            showNotification({
                type: "success",
                title: t("common.delete-success"),
                message: "",
            }),
        );
    }
}
export function* setEnableForUserSaga(payload: any) {
    const variables = payload.payload;
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.setEnableForUser,
        variables,
    );
    yield put(setLoading(false));
    const { setEnabledUser: result } = response?.data || {};
    if (result) {
        yield put(actionSuccess());
        yield put(
            showNotification({
                type: "success",
                title: t("common.update-success"),
                message: "",
            }),
        );
    }
}

export function* setPermissionByAdmin(payload: any) {
    const variables = payload.payload;
    const response: IGraphQLResponse = yield call(
        services.setPermissionByAdmin,
        variables,
    );
    const { setPermissionByAdmin: result } = response?.data || {};
    if (result) {
        yield put(actionSuccess());
        yield put(
            showNotification({
                type: "success",
                title: t("common.update-success"),
                message: "",
            }),
        );
    }
}
