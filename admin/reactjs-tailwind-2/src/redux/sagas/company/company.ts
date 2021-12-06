import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/formatTypes";
import { showNotification } from "redux/actions/notification";
import { actionSuccess, setLoading } from "redux/actions/common";
import { getCompaniesSuccess, getCompanySuccess } from "redux/actions/company";
import * as services from "services/company";
import { t } from "language";

export function* getCompaniesSaga(payload: any) {
    const variables = payload.payload;

    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.getCompanies,
        variables,
    );
    yield put(setLoading(false));

    const { getCompanies: result } = response?.data || {};
    if (result) {
        yield put(getCompaniesSuccess(result));
    }
}

export function* getCompanyByIdSaga(payload: any) {
    const variables = payload.payload;

    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.getCompanyById,
        variables,
    );
    yield put(setLoading(false));

    const { getCompanyById: result } = response?.data || {};
    if (result) {
        yield put(getCompanySuccess(result));
    }
}

export function* createCompanySaga(payload: any) {
    const variables = payload.payload;

    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.createCompany,
        variables,
    );
    yield put(setLoading(false));

    const { createCompany: result } = response?.data || {};
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

export function* updateCompanySaga(payload: any) {
    const variables = payload.payload;

    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.updateCompany,
        variables,
    );
    yield put(setLoading(false));

    const { updateCompany: result } = response?.data || {};
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

export function* deleteCompanySaga(payload: any) {
    const variables = payload.payload;

    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.deleteCompany,
        variables,
    );
    yield put(setLoading(false));

    const { deleteCompany: result } = response?.data || {};
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
