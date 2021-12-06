import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/formatTypes";
import { actionSuccess, setLoading } from "redux/actions/common";
import { getAllNotifySettingSuccess } from "redux/actions/otherSetting";
import * as services from "services/otherSetting";
import { showNotification } from "redux/actions/notification";
import { t } from "language";

export function* getAllNotifySettingSaga(payload: any) {
    const variables = payload.payload;

    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.getAllNotifySetting,
        variables,
    );
    yield put(setLoading(false));
    const { getAllNotifySetting: result } = response?.data || {};
    if (result) {
        yield put(getAllNotifySettingSuccess(result));
    }
}

export function* createNotifySettingSaga(payload: any) {
    const variables = payload.payload;

    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.createNotifySetting,
        variables,
    );
    yield put(setLoading(false));

    const { createNotifySetting: result } = response?.data || {};
    if (result) {
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

export function* updateNotifySettingSaga(payload: any) {
    const variables = payload.payload;

    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.updateNotifySetting,
        variables,
    );
    yield put(setLoading(false));

    const { updateNotifySetting: result } = response?.data || {};
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

export function* deleteNotifySettingSaga(payload: any) {
    const variables = payload.payload;

    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.deleteNotifySetting,
        variables,
    );
    yield put(setLoading(false));

    const { deleteNotifySetting: result } = response?.data || {};
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
