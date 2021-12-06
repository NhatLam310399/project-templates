import { IGraphQLResponse } from "common/formatTypes";
import { call, put } from "redux-saga/effects";
import { actionSuccess, setLoading } from "redux/actions/common";
import * as services from "services/newsConfig";
import { getAllJobLevelSuccess } from "redux/actions/newsConfig";
import { showNotification } from "redux/actions/notification";
import { t } from "language";

export function* getAllJobLevel() {
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(services.getAllJobLevel);
    yield put(setLoading(false));
    const { getAllJobLevel: results } = response?.data || {};
    if (results) {
        yield put(getAllJobLevelSuccess(results));
    }
}

export function* updateJobLevel(payload: any) {
    const variables = payload.payload;
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.updateJobLevel,
        variables,
    );
    yield put(setLoading(false));
    const { updateJobLevel: result } = response?.data || {};
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

export function* createJobLevel(payload: any) {
    const variables = payload.payload;
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.createJobLevel,
        variables,
    );
    yield put(setLoading(false));
    const { createJobLevel: result } = response?.data || {};
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

export function* deleteJobLevel(payload: any) {
    const variables = payload.payload;
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.deleteJobLevel,
        variables,
    );
    yield put(setLoading(false));
    const { deleteJobLevel: result } = response?.data || {};
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
