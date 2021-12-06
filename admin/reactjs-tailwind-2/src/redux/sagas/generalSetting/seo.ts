import { call, put } from "redux-saga/effects";
import { getSeoSuccess } from "redux/actions/generalSetting/seo";
import { showNotification } from "redux/actions/notification";
import * as services from "services/generalSetting";
import { IGraphQLResponse } from "common/formatTypes";
import { setLoading, actionSuccess } from "redux/actions/common";
import { t } from "language";

export function* getSeoSaga(payload: any) {
    const variables = payload.payload;
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(services.getSeo, variables);
    yield put(setLoading(false));
    const { getSeo: result = null } = response?.data || {};

    if (result) {
        yield put(getSeoSuccess(result));
    }
}

export function* updateSeoSaga(payload: any) {
    const variables = payload.payload;
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.updateSeo,
        variables,
    );
    yield put(setLoading(false));
    const { updateSeo: result = null } = response?.data || {};
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
