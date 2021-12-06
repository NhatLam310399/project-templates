import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/typings";
import { showNotification } from "redux/actions/notification";
import { actionSuccess, setLoading } from "redux/actions/common";
import {
  getAllCompanySuccess,
  getCompanySuccess,
  getAllCompanyHighlightSuccess,
} from "redux/actions/company";
import * as services from "services/company";

export function* getAllCompanySaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getAllCompany,
    variables,
  );
  yield put(setLoading(false));

  const { getAllCompany: result } = response?.data || {};
  if (result) {
    yield put(getAllCompanySuccess(result));
  }
}

export function* getAllCompanyHighlightSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getAllCompanyHighlight,
    variables,
  );
  yield put(setLoading(false));

  const { getAllCompanyHighlight: result } = response?.data || {};
  if (result) {
    yield put(getAllCompanyHighlightSuccess(result));
  }
}

export function* getCompanyByIdSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getCompanyById,
    variables,
  );
  yield put(setLoading(false));

  const { getCompanyById: result } = response?.data || {};
  if (result) {
    yield put(getCompanySuccess(result));
  }
}

export function* createCompanySaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.createCompany,
    variables,
  );
  yield put(setLoading(false));

  const { createCompany: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        message: "Thêm mới thành công",
      }),
    );
  }
}

export function* updateCompanySaga(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.updateCompany,
    variables,
  );
  yield put(setLoading(false));

  const { updateCompany: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        message: "Cập nhật thành công",
      }),
    );
  }
}

export function* deleteCompanyByIdSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.deleteCompanyById,
    variables,
  );
  yield put(setLoading(false));

  const { deleteCompanyById: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        message: "Xóa hành công",
      }),
    );
  }
}

export function* deleteAllCompanySaga() {
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(services.deleteAllCompany);
  yield put(setLoading(false));

  const { deleteAllCompany: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        message: "Xóa hành công",
      }),
    );
  }
}

// setPlaceHight apply for both company and karaoke
export function* setPlaceHighlight(payload: any) {
  const variables = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.setPlaceHighlight,
    variables,
  );
  yield put(setLoading(false));

  const { setPlaceHighlight: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        title: "",
        message: "Cập nhật thành công",
      }),
    );
  }
}
