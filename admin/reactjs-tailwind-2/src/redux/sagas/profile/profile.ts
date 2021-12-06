import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/formatTypes";
import { actionSuccess, setLoading } from "redux/actions/common";
import { getProfileSuccess } from "redux/actions/profile";
import * as services from "services/listUsers";
import { showNotification } from "redux/actions/notification";
import { t } from "language";

export function* getProfileSaga(payload: any) {
    const variables = payload.payload;

    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.getUserById,
        variables,
    );
    yield put(setLoading(false));

    const { getUserById: result } = response?.data || {};
    if (result) {
        yield put(getProfileSuccess(result));
    }
}
export function* updateUseProfile(payload: any) {
    const variables = payload.payload;

    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.updateUserProfile,
        variables,
    );
    yield put(setLoading(false));

    const { updateUserProfile: result } = response?.data || {};
    if (result) {
        yield put(actionSuccess());
        yield put(
            showNotification({
                type: "success",
                title: "",
                message: "",
            }),
        );
    }
}
