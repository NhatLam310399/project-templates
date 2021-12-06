import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/formatTypes";
import { actionSuccess, setLoading } from "redux/actions/common";
import { getPointSettingSuccess } from "redux/actions/otherSetting";
import * as services from "services/otherSetting";
import { showNotification } from "redux/actions/notification";
import { t } from "language";

export function* getPointSettingSaga(payload: any) {
    const variables = payload.payload;

    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.getPointSetting,
        variables,
    );
    yield put(setLoading(false));

    const { getPointSetting: result } = response?.data || {};
    if (result) {
        yield put(getPointSettingSuccess(result));
    }
}

export function* updatePointSettingSaga(payload: any) {
    const variables = payload.payload;

    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.updatePointSetting,
        variables,
    );
    yield put(setLoading(false));

    const { updatePointSetting: result } = response?.data || {};
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
