import produce from "immer";
import * as types from "@redux/types/ads";
import { AnyAction } from "redux";
import { IAds } from "@common/typings";

interface IAdState {
  listAds: IAds[];
  adsByLocation: IAds[];
  listAdsJobPage: IAds[];
  loadingAdsByLocation: boolean;
}

const initialState: IAdState = {
  listAds: [],
  adsByLocation: [],
  listAdsJobPage: [],
  loadingAdsByLocation: true,
};

const ads = (state = initialState, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.GET_ADS_ALL_SUCCESS:
        draft.listAds = action.payload;
      case types.GET_ADS_BY_LOCATION_SUCCESS:
        draft.adsByLocation = action.payload;
        draft.loadingAdsByLocation = false;
        break;
      case types.GET_ADS_JOB_PAGE_SUCCESS:
        draft.listAdsJobPage.push(action.payload);
    }
  });

export default ads;
