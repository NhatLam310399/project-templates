import produce from "immer";
import { AnyAction } from "redux";

import * as types from "@redux/types/evaluate";
import { IEvaluate } from "@common/typings";

interface IEvaluateState {
  evaluateList: IEvaluate[];
}

const initialState: IEvaluateState = {
  evaluateList: [],
};

const reducer = (state = initialState, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.GET_EVALUATE_BY_USER_ID_SUCCESS:
        draft.evaluateList = action.payload;
        break;

      default:
        break;
    }
  });

export default reducer;
