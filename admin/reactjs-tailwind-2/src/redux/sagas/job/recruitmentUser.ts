import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/formatTypes";
import { actionSuccess, setLoading } from "redux/actions/common";
import { getRecruitmentUserSuccess } from "redux/actions/job";
import * as services from "services/job";
import { t } from "language";

export function* getRecruitmentAppliedUserSaga(payload: any) {
    const variables = payload.payload;
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.getRecruitmentAppliedUser,
        variables,
    );
    yield put(setLoading(false));
    const { getRecruitmentAppliedUser: result = [] } = response?.data || {};
    if (result) {
        yield put(getRecruitmentUserSuccess(result));
    }
}

export function* getRecruitmentViewedUserSaga(payload: any) {
    const variables = payload.payload;
    yield put(setLoading(true));
    const response: IGraphQLResponse = yield call(
        services.getRecruitmentViewedUser,
        variables,
    );
    yield put(setLoading(false));
    const { getRecruitmentViewedUser: result = [] } = response?.data || {};
    if (result) {
        yield put(getRecruitmentUserSuccess(result));
    }
}
