import produce from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/common";

interface ICommonState {
  isSubmitted: boolean;
  actionSuccess: boolean;
  isLoading: boolean;
}

const initialState: ICommonState = {
  isSubmitted: false,
  actionSuccess: false,
  isLoading: false,
};

const reducer = (state = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SUBMITTED:
        draft.isSubmitted = true;
        break;
      case types.RESET_SUBMITTED:
        draft.isSubmitted = false;
        break;
      case types.ACTION_SUCCESS:
        draft.actionSuccess = true;
        break;
      case types.RESET_ACTION:
        draft.actionSuccess = false;
        break;
      case types.SET_LOADING:
        draft.isLoading = action.payload;
    }
  });

export default reducer;
