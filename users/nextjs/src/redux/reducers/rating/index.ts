import produce from "immer";
import { AnyAction } from "redux";
import * as types from "@redux/types/rating";
import { IRating } from "@common/typings";

interface IRatingReducer {
  rating: IRating | null;
}

const initialState: IRatingReducer = {
  rating: null,
};

const reducer = (state = initialState, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.GET_RATING_BY_USER_ID_SUCCESS:
        draft.rating = action.payload;
        break;

      default:
        break;
    }
  });

export default reducer;
