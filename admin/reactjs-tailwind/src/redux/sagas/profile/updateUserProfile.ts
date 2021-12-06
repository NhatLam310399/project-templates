import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/typings";
import { showNotification } from "redux/actions/notification";
import { actionSuccess, setLoading } from "redux/actions/common";
import * as services from "services/users";
import { getProfile } from "redux/actions/profile";

export function* updateUserProfileSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.updateUserProfile,
    variables,
  );
  yield put(setLoading(false));

  const { updateUserProfile: result } = response?.data || {};
  if (result) {
    yield put(getProfile({ id: result?._id }));
    yield put(
      showNotification({
        type: "success",
        title: "Cập nhập thông tin thành công",
        message: "",
      }),
    );
  }
}
