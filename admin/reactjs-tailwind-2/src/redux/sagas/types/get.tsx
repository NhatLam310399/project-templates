import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/formatTypes";
import * as services from "services/types";
import { getTypesByCodeSuccess } from "redux/actions/types";

export function* getTypesByCode(payload: any) {
    const variables = payload.payload;
    const response: IGraphQLResponse = yield call(
        services.getTypesByCode,
        variables,
    );
    const { getTypesByCode: result } = response?.data || {};
    if (result) {
        yield put(getTypesByCodeSuccess(result));
    }
}
