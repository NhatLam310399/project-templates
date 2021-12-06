import { IPermissionType, IUpdatePlace } from "common/typings";
import { store } from "index";
import { updateCompany, updateKaraoke } from "redux/actions/place";

export const updatePlaceApi = (payload: IUpdatePlace, permission = "") => {
  if (permission === "KARAOKE") {
    store.dispatch(updateKaraoke(payload));
  } else {
    store.dispatch(updateCompany(payload));
  }
};
