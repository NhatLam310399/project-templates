import { actionSuccess } from "@redux/actions/common";
import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "@common/typings";
import * as services from "@services/company";
import {
  getAllCompanySuccess,
  getCompanyBySlugSuccess,
  getCompanySuccess,
  getMostAppliedCompanySuccess,
  getMostRecruitingCompanySuccess,
  getMostViewCompanySuccess,
  getNewestCompanySuccess,
} from "@redux/actions/company";

export function* getAllCompanySaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.getAllCompany,
    variables,
  );
  const { getCompanies: result } = response?.data || {};
  if (result) {
    yield put(getAllCompanySuccess(result));
  }
}

export function* getCompanySaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(services.getCompany, variables);
  const { getCompanyById: result } = response?.data || {};
  if (result) {
    yield put(getCompanySuccess(result));
  }
}

export function* getCompanyBySlugSaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.getCompanyBySlug,
    variables,
  );
  const { getCompanyBySlug: result } = response?.data || {};
  if (result) {
    yield put(getCompanyBySlugSuccess(result));
  }
}

export function* getNewestCompanySaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.getAllCompany,
    variables,
  );
  const { getCompanies: result } = response?.data || {};
  if (result) {
    yield put(getNewestCompanySuccess(result));
  }
}

export function* getMostViewCompanySaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.getAllCompany,
    variables,
  );
  const { getCompanies: result } = response?.data || {};
  if (result) {
    yield put(getMostViewCompanySuccess(result));
  }
}

export function* getMostAppliedCompanySaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.getAllCompany,
    variables,
  );
  const { getCompanies: result } = response?.data || {};
  if (result) {
    yield put(getMostAppliedCompanySuccess(result));
  }
}

export function* getMostRecruitingCompanySaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.getAllCompany,
    variables,
  );
  const { getCompanies: result } = response?.data || {};
  if (result) {
    yield put(getMostRecruitingCompanySuccess(result));
  }
}

export function* updateCompanySaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.updateCompany,
    variables,
  );

  const { updateCompany: result } = response?.data || {};

  if (result) {
    yield put(actionSuccess());
  }
}

export function* updateCompanyProvinceSaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.updateCompanyProvince,
    variables,
  );

  const { updateCompanyProvince: result } = response?.data || {};

  if (result) {
    yield put(actionSuccess());
  }
}

export function* setSubscribeCompanySaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.setSubscribeCompany,
    variables,
  );

  const { setSubscribedCompany: result } = response?.data || {};

  if (result) {
    yield put(actionSuccess());
  }
}

export function* setSeenCompanySaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.setSeenCompany,
    variables,
  );

  const { setSeenCompany: result } = response?.data || {};

  if (result) {
    return true;
  }
}
