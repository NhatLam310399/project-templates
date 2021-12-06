import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/typings";
import { showNotification } from "redux/actions/notification";
import { actionSuccess, setLoading } from "redux/actions/common";
import {
  getAllCareStaffSuccess,
  getCareStaffSuccess,
} from "redux/actions/careStaff";
import * as services from "services/careStaff";

export function* getAllCareStaffSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getAllCareStaff,
    variables,
  );
  yield put(setLoading(false));
  const { getAllCareStaff: result } = response?.data || {};
  if (result) {
    yield put(getAllCareStaffSuccess(result));
  }
}

export function* getCareStaffByIdSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getCareStaffById,
    variables,
  );
  yield put(setLoading(false));

  const { getCareStaffById: result } = response?.data || {};
  if (result) {
    yield put(getCareStaffSuccess(result));
  }
}

export function* deleteCareStaffByIdSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.deleteCareStaffById,
    variables,
  );
  yield put(setLoading(false));

  const { deleteCareStaffById: result } = response?.data || {};
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
