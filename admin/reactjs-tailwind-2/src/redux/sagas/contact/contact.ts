import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/formatTypes";
import { actionSuccess, setLoading } from "redux/actions/common";
import { getAllContactSuccess } from "redux/actions/contact";
import * as services from "services/contact";
import { showNotification } from "redux/actions/notification";
import { t } from "language";

export function* getAllContactSaga(payload: any) {
    const variables = payload.payload;

    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.getAllContact,
        variables,
    );
    yield put(setLoading(false));

    const { getAllContact: result } = response?.data || {};
    if (result) {
        yield put(getAllContactSuccess(result));
    }
}

export function* deleteContactSaga(payload: any) {
    const variables = payload.payload;

    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.deleteContact,
        variables,
    );
    yield put(setLoading(false));

    const { deleteContact: result } = response?.data || {};
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
