import produce from "immer";
import { AnyAction } from "redux";
import { IAds } from "common/formatTypes";
import * as types from "redux/types/ads";

export interface IAdsState {
    allAds: IAds[];
    loading: boolean;
    ads: IAds;
}

const initialState: IAdsState = {
    allAds: [],
    loading: true,
    ads: {},
};

const adsReducer = (state = initialState, action: AnyAction) =>
    produce(state, draft => {
        switch (action.type) {
            case types.GET_ADS_ALL_SUCCESS:
                draft.allAds = action.payload;
                draft.loading = false;
                break;
            case types.GET_ADS_SUCCESS:
                draft.ads = action.payload;
                break;
        }
    });

export default adsReducer;
