import { call, put } from "redux-saga/effects";
import { setLoading, actionSuccess } from "redux/actions/common";
import { showNotification } from "redux/actions/notification";
import { getKaraokeByBossSuccess } from "redux/actions/place";
import * as services from "services/place";
import { IGraphQLResponse } from "common/typings/App";

export function* getKaraokeByBossSaga(payload: any) {
  const variable = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getKaraokeByBoss,
    variable,
  );

  yield put(setLoading(false));
  const { getKaraokeByBoss: result } = response.data || {};
  if (result) {
    yield put(getKaraokeByBossSuccess(result));
  }
}

export function* updateKaraokeSaga(payload: any) {
  const variable = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.updateKaraoke,
    variable,
  );
  yield put(setLoading(false));
  const { updateKaraoke: result } = response.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        title: "",
        message: "Cập nhật thông tin thành công",
      }),
    );
  }
}

export function* updateCompanySaga(payload: any) {
  const variable = payload.payload;
  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.updateCompany,
    variable,
  );
  yield put(setLoading(false));
  const { updateCompany: result } = response.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        title: "",
        message: "Cập nhật thông tin thành công",
      }),
    );
  }
}
