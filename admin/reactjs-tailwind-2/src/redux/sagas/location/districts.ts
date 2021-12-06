import { call, put } from "redux-saga/effects";
import { setLoading, actionSuccess } from "redux/actions/common";
import { getDistrictsSuccess } from "redux/actions/location";
import { showNotification } from "redux/actions/notification";
import * as locationService from "services/location";
import { IGraphQLResponse } from "common/formatTypes";
import { t } from "language";

export function* getDistrictsSaga(payload: any) {
    const variables = payload.payload;
    yield put(setLoading(true));

    const response: IGraphQLResponse = yield call(
        locationService.getDistrictsByProvince,
        variables,
    );
    yield put(setLoading(false));
    const { getDistrictsByProvince: result } = response?.data;
    if (result) {
        yield put(getDistrictsSuccess(result));
    }
}

export function* updateDistrictSaga(payload: any) {
    const variables = payload.payload;
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        locationService.updateDistrict,
        variables,
    );
    yield put(setLoading(false));
    const { updateDistrict: result } = response?.data || {};
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

export function* createDistrictSaga(payload: any) {
    const variables = payload.payload;
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        locationService.createDistrict,
        variables,
    );
    yield put(setLoading(false));
    const { createDistrict: result } = response?.data || {};
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
export function* deleteDistrictSaga(payload: any) {
    const variables = payload.payload;
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        locationService.deleteDistrict,
        variables,
    );
    yield put(setLoading(false));
    const { deleteDistrict: result } = response?.data || {};
    if (result) {
        yield put(actionSuccess());
        yield put(
            showNotification({
                type: "success",
                title: "",
                message: "Xoá Quận/Huyện/Thị xã thành công",
            }),
        );
    }
}
