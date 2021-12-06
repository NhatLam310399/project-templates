import { call, put } from "redux-saga/effects";
import * as action from "redux/actions/generalSetting";
import { showNotification } from "redux/actions/notification";
import * as services from "services/generalSetting";
import { IGraphQLResponse } from "common/formatTypes";
import { setLoading, actionSuccess } from "redux/actions/common";
import { t } from "language";

export function* getContentWebsiteByIdSaga(payload: any) {
    const variables = payload.payload;
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.getContentWebsiteById,
        variables,
    );
    yield put(setLoading(false));
    const { getContentWebsiteById: result } = response?.data || {};
    if (result) {
        yield put(action.getContentWebsiteByIdSuccess(result));
    }
}

export function* updateContentWebsiteSaga(payload: any) {
    const variables = payload.payload;
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.updateContentWebsite,
        variables,
    );
    yield put(setLoading(false));
    const { updateContentWebsite: result } = response?.data || {};
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
