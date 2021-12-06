import { IGraphQLResponse } from "common/formatTypes";
import { call, put } from "redux-saga/effects";
import { actionSuccess, setLoading } from "redux/actions/common";
import * as services from "services/newsConfig";
import { getAllJobTypeSuccess } from "redux/actions/newsConfig";
import { showNotification } from "redux/actions/notification";
import { t } from "language";

export function* getAllJobTypeSaga(payload: any) {
    const variables = payload.payload;
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.getAllJobType,
        variables,
    );
    yield put(setLoading(false));
    const { getAllJobType: results } = response?.data || {};
    if (results) {
        yield put(getAllJobTypeSuccess(results));
    }
}

export function* updateJobTypeSaga(payload: any) {
    const variables = payload.payload;
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.updateJobType,
        variables,
    );
    yield put(setLoading(false));
    const { updateJobType: result } = response?.data || {};
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

export function* createJobTypeSaga(payload: any) {
    const variables = payload.payload;
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.createJobType,
        variables,
    );
    yield put(setLoading(false));
    const { createJobType: result } = response?.data || {};
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

export function* deleteJobTypeSaga(payload: any) {
    const variables = payload.payload;
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.deleteJobType,
        variables,
    );
    yield put(setLoading(false));
    const { deleteJobType: result } = response?.data || {};
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
