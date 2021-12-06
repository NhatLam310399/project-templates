import { IGraphQLResponse } from "common/formatTypes";
import { call, put } from "redux-saga/effects";
import { actionSuccess, setLoading } from "redux/actions/common";
import * as services from "services/newsConfig";
import { getAllKeywordSuccess } from "redux/actions/newsConfig";
import { showNotification } from "redux/actions/notification";
import { t } from "language";

export function* getAllKeyword(payload: any) {
    const variables = payload.payload;
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.getAllKeyWord,
        variables,
    );
    yield put(setLoading(false));
    const { getAllKeyword: results } = response?.data || {};
    if (results) {
        yield put(getAllKeywordSuccess(results));
    }
}

export function* updateKeyword(payload: any) {
    const variables = payload.payload;
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.updateKeyword,
        variables,
    );
    yield put(setLoading(false));
    const { updateKeyword: result } = response?.data || {};
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

export function* createKeyword(payload: any) {
    const variables = payload.payload;
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.createKeyword,
        variables,
    );
    yield put(setLoading(false));
    const { createKeyword: result } = response?.data || {};
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

export function* deleteKeyword(payload: any) {
    const variables = payload.payload;
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.deleteKeyword,
        variables,
    );
    yield put(setLoading(false));
    const { deleteKeyword: result } = response?.data || {};
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
