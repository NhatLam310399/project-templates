import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/formatTypes";
import { actionSuccess, setLoading } from "redux/actions/common";
import { getAllTagSuccess } from "redux/actions/blog";
import * as services from "services/blog";
import { showNotification } from "redux/actions/notification";
import { t } from "language";

export function* getAllTagSaga(payload: any) {
    const variables = payload.payload;

    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.getAllTag,
        variables,
    );
    yield put(setLoading(false));
    const { getAllTag: result } = response?.data || {};
    if (result) {
        yield put(getAllTagSuccess(result));
    }
}

export function* createTagSaga(payload: any) {
    const variables = payload.payload;

    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.createTag,
        variables,
    );
    yield put(setLoading(false));

    const { createTag: result } = response?.data || {};
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

export function* updateTagSaga(payload: any) {
    const variables = payload.payload;

    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.updateTag,
        variables,
    );
    yield put(setLoading(false));

    const { updateTag: result } = response?.data || {};
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

export function* deleteTagSaga(payload: any) {
    const variables = payload.payload;

    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.deleteTag,
        variables,
    );
    yield put(setLoading(false));

    const { deleteTag: result } = response?.data || {};
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
