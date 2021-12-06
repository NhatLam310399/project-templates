import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/formatTypes";
import { showNotification } from "redux/actions/notification";
import { actionSuccess, setLoading } from "redux/actions/common";
import { getAllJobSuccess } from "redux/actions/job";
import * as services from "services/job";
import { t } from "language";

export function* getAllJobSaga(payload: any) {
    const variables = payload.payload;
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.getAllJob,
        variables,
    );
    yield put(setLoading(false));
    const { getAllRecruitment: result } = response?.data || {};
    if (result) {
        yield put(getAllJobSuccess(result));
    }
}

export function* createJobSaga(payload: any) {
    const variables = payload.payload;

    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.CreateJob,
        variables,
    );
    yield put(setLoading(false));

    const { createRecruitment: result } = response?.data || {};
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

export function* updateJobSaga(payload: any) {
    const variables = payload.payload;

    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.UpdateJob,
        variables,
    );
    yield put(setLoading(false));

    const { updateRecruitment: result } = response?.data || {};
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

export function* deleteJobSaga(payload: any) {
    const variables = payload.payload;

    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.DeleteJob,
        variables,
    );
    yield put(setLoading(false));

    const { deleteRecruitment: result } = response?.data || {};
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
