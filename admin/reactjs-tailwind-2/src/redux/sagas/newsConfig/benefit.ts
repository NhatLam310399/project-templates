import { IGraphQLResponse } from "common/formatTypes";
import { call, put } from "redux-saga/effects";
import { actionSuccess, setLoading } from "redux/actions/common";
import * as services from "services/newsConfig";
import { getAllBenefitSuccess } from "redux/actions/newsConfig";
import { showNotification } from "redux/actions/notification";
import { t } from "language";

export function* getAllBenefitSaga(payload: any) {
    const variables = payload.payload;
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.getAllBenefit,
        variables,
    );
    yield put(setLoading(false));
    const { getAllBenefit: results } = response?.data || {};
    if (results) {
        yield put(getAllBenefitSuccess(results));
    }
}

export function* updateBenefitSaga(payload: any) {
    const variables = payload.payload;
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.updateBenefit,
        variables,
    );
    yield put(setLoading(false));
    const { updateBenefit: result } = response?.data || {};
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

export function* createBenefitSaga(payload: any) {
    const variables = payload.payload;
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.createBenefit,
        variables,
    );
    yield put(setLoading(false));
    const { createBenefit: result } = response?.data || {};
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

export function* deleteBenefitSaga(payload: any) {
    const variables = payload.payload;
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.deleteBenefit,
        variables,
    );
    yield put(setLoading(false));
    const { deleteBenefit: result } = response?.data || {};
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
