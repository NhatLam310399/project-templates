import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/formatTypes";
import { actionSuccess, setLoading } from "redux/actions/common";
import { getAllCategorySuccess } from "redux/actions/blog";
import * as services from "services/blog";
import { showNotification } from "redux/actions/notification";
import { t } from "language";

export function* getAllCategorySaga(payload: any) {
    const variables = payload.payload;

    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.getAllCategory,
        variables,
    );
    yield put(setLoading(false));

    const { getAllCategory: result } = response?.data || {};
    if (result) {
        yield put(getAllCategorySuccess(result));
    }
}

export function* createCategorySaga(payload: any) {
    const variables = payload.payload;

    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.createCategory,
        variables,
    );
    yield put(setLoading(false));

    const { createCategory: result } = response?.data || {};
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

export function* updateCategorySaga(payload: any) {
    const variables = payload.payload;

    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.updateCategory,
        variables,
    );
    yield put(setLoading(false));

    const { updateCategory: result } = response?.data || {};
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

export function* deleteCategorySaga(payload: any) {
    const variables = payload.payload;

    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.deleteCategory,
        variables,
    );
    yield put(setLoading(false));

    const { deleteCategory: result } = response?.data || {};
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
