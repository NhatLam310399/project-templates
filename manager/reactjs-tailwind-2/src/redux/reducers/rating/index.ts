import produce from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/rating";
import { IRating } from "common/typings";

interface IRatingState {
  allRating: {
    results: IRating[];
    totalCount: number;
  };
}

const initialState: IRatingState = {
  allRating: {
    results: [],
    totalCount: 0,
  },
};

const ratingReducer = (state = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_ALL_RATING_SUCCESS:
        draft.allRating = action.payload;
        break;

      default:
        break;
    }
  });

export default ratingReducer;
