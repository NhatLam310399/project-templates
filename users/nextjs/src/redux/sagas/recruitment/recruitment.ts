import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "@common/typings";
import * as services from "@services/recruitment";
import {
  getAllRecruitmentSuccess,
  getBestRecruitmentSuccess,
  getRecruitmentBySlugSuccess,
  getRecruitmentByIdSuccess,
} from "@redux/actions/recruitment";
import { actionSuccess, setLoading } from "@redux/actions/common";
import { showNotification } from "@components/ToastNotification";

export function* getAllRecruitmentSaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.getAllRecruitment,
    variables,
  );
  const { getAllRecruitment: result } = response?.data || {};
  if (result) {
    yield put(getAllRecruitmentSuccess(result));
  }
}

export function* getRecruitmentByCompanySaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.getRecruitmentByCompany,
    variables,
  );
  const { getRecruitmentByCompany: result } = response?.data || {};
  if (result) {
    yield put(getAllRecruitmentSuccess(result));
  }
}

export function* getRecruitmentByUserSaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.getRecruitmentByUser,
    variables,
  );
  const { getRecruitmentByUser: result } = response?.data || {};
  if (result) {
    yield put(getAllRecruitmentSuccess(result));
  }
}

export function* getRecruitmentByIdSaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.getRecruitmentById,
    variables,
  );
  const { getRecruitmentById: result } = response?.data || {};
  if (result) {
    yield put(getRecruitmentByIdSuccess(result));
  }
}

export function* getRecruitmentBySlugSaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.getRecruitmentBySlug,
    variables,
  );
  const { getRecruitmentBySlug: result } = response?.data || {};
  if (result) {
    yield put(getRecruitmentBySlugSuccess(result));
  }
}

export function* setSeenRecruitmentSaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.setSeenRecruitment,
    variables,
  );
  const { setSeenRecruitment: result } = response?.data || {};
  if (result) {
    return true;
  }
}

export function* setAppliedRecruitmentSaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.setAppliedRecruitment,
    variables,
  );
  const { setAppliedRecruitment: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());

    showNotification({
      type: "success",
      title: "Thông báo",
      message: "Ứng tuyển thành công",
    });
  }
}

export function* setSavedRecruitmentSaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.setSavedRecruitment,
    variables,
  );
  const { setSavedRecruitment: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    showNotification({
      type: "success",
      title: "Thông báo",
      message: "Lưu việc làm thành công",
    });
  }
}

export function* removeSavedRecruitmentSaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.removeSavedRecruitment,
    variables,
  );
  const { removeSavedRecruitmentUser: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    showNotification({
      type: "success",
      title: "Thông báo",
      message: "Xóa việc làm thành công",
    });
  }
}

export function* createRecruitmentSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.createRecruitment,
    variables,
  );
  yield put(setLoading(false));

  const { createRecruitment: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());

    showNotification({
      type: "success",
      title: "Thông báo",
      message: "Tạo thành công",
    });
  }
}

export function* getBestRecruitment(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getBestRecruitment,
    variables,
  );
  yield put(setLoading(false));

  const { getBestRecruitment: result } = response?.data || {};

  if (result) {
    yield put(getBestRecruitmentSuccess(result));
  }
}
