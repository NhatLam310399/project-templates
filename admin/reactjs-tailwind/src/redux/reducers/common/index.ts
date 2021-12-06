import produce from "immer";
import * as types from "redux/types/common";
import { AnyAction } from "redux";

interface ICommonState {
  isSubmitted: boolean;
  actionSuccess: boolean;
  isLoading: boolean;
  loading: {
    table: boolean;
    uploadVideo: boolean;
    uploadImage: boolean;
  };
  progress: number;
}

const initialState: ICommonState = {
  isSubmitted: false,
  actionSuccess: false,
  isLoading: false,
  loading: {
    table: false,
    uploadVideo: false,
    uploadImage: false,
  },
  progress: 0,
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
        break;
      case types.SET_PROGRESS:
        draft.progress = action.payload;
        break;
      default:
        break;
    }
  });

export default reducer;
