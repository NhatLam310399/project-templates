import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/formatTypes";
import { setLoading } from "redux/actions/common";
import { getOverviewSuccess } from "redux/actions/overview";
import * as services from "services/overview";

export function* getAllNotifySettingSaga() {
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(services.getOverview);
    yield put(setLoading(false));
    const { getOverView: result } = response?.data || {};
    if (result) {
        yield put(getOverviewSuccess(result));
    }
}
