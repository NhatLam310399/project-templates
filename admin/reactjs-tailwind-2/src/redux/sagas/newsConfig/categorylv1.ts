import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/formatTypes";
import { showNotification } from "redux/actions/notification";
import { actionSuccess, setLoading } from "redux/actions/common";
import { getAllCategoryLevel1Success } from "redux/actions/newsConfig";
import * as services from "services/newsConfig";
import { t } from "language";

export function* getAllCategoryLevel1Saga(payload: any) {
    const variables = payload.payload;

    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.getAllCategoryLevel1,
        variables,
    );
    yield put(setLoading(false));

    const { getAllCategoryLevel1: result } = response?.data || {};
    if (result) {
        yield put(getAllCategoryLevel1Success(result));
    }
}

export function* createCategoryLevel1Saga(payload: any) {
    const variables = payload.payload;
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.createCategoryLevel1,
        variables,
    );
    yield put(setLoading(false));

    const { createCategoryLevel1: result } = response?.data || {};
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

export function* updateCategoryLevel1Saga(payload: any) {
    const variables = payload.payload;

    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.updateCategoryLevel1,
        variables,
    );
    yield put(setLoading(false));

    const { updateCategoryLevel1: result } = response?.data || {};
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

export function* deleteCategoryLevel1Saga(payload: any) {
    const variables = payload.payload;

    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.deleteCategoryLevel1,
        variables,
    );
    yield put(setLoading(false));

    const { deleteCategoryLevel1: result } = response?.data || {};
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
