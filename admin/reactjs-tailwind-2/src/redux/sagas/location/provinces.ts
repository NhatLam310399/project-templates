import { call, put } from "redux-saga/effects";
import {
    getProvincesSuccess,
    getSuggestionProvincesSuccess,
} from "redux/actions/location";
import { showNotification } from "redux/actions/notification";
import * as services from "services/location";
import { IGraphQLResponse } from "common/formatTypes";
import { setLoading, actionSuccess } from "redux/actions/common";

export function* getProvincesSaga(payload: any) {
    const variables = payload.payload;
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.getProvinces,
        variables,
    );
    yield put(setLoading(false));

    const { getProvinces: result } = response?.data || {};
    if (result) {
        yield put(getProvincesSuccess(result));
    }
}

export function* getSuggestionProvincesSaga(payload: any) {
    const variables = payload.payload;
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.getProvinces,
        variables,
    );
    yield put(setLoading(false));

    const { getProvinces: result } = response?.data || {};
    if (result) {
        yield put(getSuggestionProvincesSuccess(result));
    }
}

export function* updateProvinceSaga(payload: any) {
    const variables = payload.payload;

    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.updateProvince,
        variables,
    );
    yield put(setLoading(false));

    const { updateProvince: result } = response?.data || {};
    if (result) {
        yield put(actionSuccess());
        yield put(
            showNotification({
                title: "Thành công",
                type: "success",
                message: "Cập nhật Tỉnh/Thành phố thành công",
            }),
        );
    }
}
