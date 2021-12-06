import produce from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/revenueKaraoke";
import { IYearType } from "common/typings";

interface IRevenueKaraokeState {
  revenueKaraoke: IYearType | null;
}

const initialState: IRevenueKaraokeState = {
  revenueKaraoke: null,
};

const revenueKaraokeReducer = (state = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_REVENUE_KARAOKE_SUCCESS:
        draft.revenueKaraoke = action.payload;
        break;
      default:
        break;
    }
  });

export default revenueKaraokeReducer;
