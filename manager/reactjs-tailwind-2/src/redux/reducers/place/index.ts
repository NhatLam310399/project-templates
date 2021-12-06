import producer from "immer";
import * as types from "redux/types/place";
import { IPlace } from "common/typings";
import { AnyAction } from "redux";

export interface IPlaceState {
  place: IPlace | null;
}

const initialState: IPlaceState = {
  place: null,
};

export default (state = initialState, actions: AnyAction) =>
  producer(state, draft => {
    switch (actions.type) {
      case types.GET_KARAOKE_BY_BOSS_SUCCESS:
        draft.place = actions.payload;
        break;
      case types.CLEAN_PLACE:
        draft.place = null;
        break;
      default:
        break;
    }
  });
