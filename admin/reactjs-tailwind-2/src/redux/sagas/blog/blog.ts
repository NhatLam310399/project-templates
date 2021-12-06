import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/formatTypes";
import { actionSuccess, setLoading } from "redux/actions/common";
import { getAllCareerCounselingSuccess } from "redux/actions/blog";
import * as services from "services/blog";
import { showNotification } from "redux/actions/notification";
import { t } from "language";

export function* getAllCareerCounselingSaga(payload: any) {
    const variables = payload.payload;

    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.getAllCareerCounseling,
        variables,
    );
    yield put(setLoading(false));

    const { getAllCareerCounseling: result } = response?.data || {};
    if (result) {
        yield put(getAllCareerCounselingSuccess(result));
    }
}

export function* createCareerCounselingSaga(payload: any) {
    const variables = payload.payload;

    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.createCareerCounseling,
        variables,
    );
    yield put(setLoading(false));

    const { createCareerCounseling: result } = response?.data || {};
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

export function* updateCareerCounselingSaga(payload: any) {
    const variables = payload.payload;

    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.updateCareerCounseling,
        variables,
    );
    yield put(setLoading(false));

    const { updateCareerCounseling: result } = response?.data || {};
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

export function* deleteCareerCounselingSaga(payload: any) {
    const variables = payload.payload;

    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.deleteCareerCounseling,
        variables,
    );
    yield put(setLoading(false));

    const { deleteCareerCounseling: result } = response?.data || {};
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
