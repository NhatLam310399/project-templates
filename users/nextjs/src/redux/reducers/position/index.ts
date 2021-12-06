import produce from "immer";
import { AnyAction } from "redux";
import * as types from "@redux/types/position";

interface reducer {
  allPositions: any[];
  totalCount: number;
}

const initialState: reducer = {
  allPositions: [],
  totalCount: 0,
};

const reducer = (state = initialState, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.GET_POSITION_SUCCESS:
        draft.allPositions = action.payload.results;
        draft.totalCount = action.payload.totalCount;
        break;
      default:
        break;
    }
  });

export default reducer;
