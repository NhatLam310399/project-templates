import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/formatTypes";
import { showNotification } from "redux/actions/notification";
import { actionSuccess, setLoading } from "redux/actions/common";
import { getAllRatingSuccess, deleteRating } from "redux/actions/rating";
import * as services from "services/rating";
import { t } from "language";

export function* getAllRatingSaga(payload: any) {
    const variables = payload.payload;

    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.getAllRating,
        variables,
    );
    yield put(setLoading(false));

    const { getAllRatings: result } = response?.data || {};
    if (result) {
        yield put(getAllRatingSuccess(result));
    }
}

export function* createRating(payload: any) {
    const variables = payload.payload;
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.createRating,
        variables,
    );
    yield put(setLoading(false));
    const { createRating: result } = response?.data || {};
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

export function* updateRating(payload: any) {
    const variables = payload.payload;
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.updateRating,
        variables,
    );
    yield put(setLoading(false));
    const { updateRating: result } = response?.data || {};
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

export function* deleteRatingSaga(payload: any) {
    const variables = payload.payload;
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.deleteRating,
        variables,
    );
    yield put(setLoading(false));
    const { deleteRatingById: result } = response?.data || {};
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
