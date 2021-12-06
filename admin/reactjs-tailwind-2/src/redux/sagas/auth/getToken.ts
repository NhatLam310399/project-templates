import { call, put } from "redux-saga/effects";
import { IGetToken, IGraphQLResponse } from "common/formatTypes";
import * as services from "services/auth";
import { getTokenSuccess } from "redux/actions/auth";
import { showNotification } from "redux/actions/notification";

export function* getToken(payload: any) {
    const variables: IGetToken = { idToken: payload.payload.idToken };

    const response: IGraphQLResponse = yield call(
        services.getAccessToken,
        variables,
    );
    const result = response?.data || {};
    if (result) {
        yield put(getTokenSuccess(result));
    }
}
