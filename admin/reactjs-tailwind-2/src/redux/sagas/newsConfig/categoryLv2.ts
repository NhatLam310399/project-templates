import { call, put } from "redux-saga/effects";
import * as services from "services/newsConfig";
import { IGraphQLResponse } from "common/formatTypes";
import { actionSuccess, setLoading } from "redux/actions/common";
import { getAllCategoryLevel2Success } from "redux/actions/newsConfig";
import { showNotification } from "redux/actions/notification";
import { t } from "language";

export function* getAllCategoryLevel2(payload: any) {
    const variables = payload.payload;
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.getAllCategoryLevel2,
        variables,
    );
    yield put(setLoading(false));
    const { getAllCategoryLevel2: results } = response?.data || {};
    if (results) {
        yield put(getAllCategoryLevel2Success(results));
    }
}

export function* deleteCategoryLevel2(payload: any) {
    const variables = payload.payload;
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.deleteCategoryLevel2,
        variables,
    );
    yield put(setLoading(false));
    const { deleteCategoryLevel2: result } = response?.data || {};
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

export function* updateCategoryLevel2(payload: any) {
    const variables = payload.payload;
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.updateCategoryLevel2,
        variables,
    );
    yield put(setLoading(false));
    const { updateCategoryLevel2: result } = response?.data || {};
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

export function* createCategoryLevel2(payload: any) {
    const variables = payload.payload;
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.createCategoryLevel2,
        variables,
    );
    yield put(setLoading(false));
    const { createCategoryLevel2: result } = response?.data || {};
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
