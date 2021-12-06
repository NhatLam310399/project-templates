import produce from "immer";
import { AnyAction } from "redux";
import { IAds } from "typings";
import * as types from "redux/types/ads";

export interface IAdsState {
  allAds: IAds[];
  ads: IAds;
}

const initialState: IAdsState = {
  allAds: [],
  ads: {},
};

const adsReducer = (state = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_ADS_ALL_SUCCESS:
        draft.allAds = action.payload;
        break;
      case types.GET_ADS_SUCCESS:
        draft.ads = action.payload;
        break;
    }
  });

export default adsReducer;
