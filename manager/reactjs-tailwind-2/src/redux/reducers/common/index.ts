import produce from "immer";
import * as types from "redux/types/common";
import { AnyAction } from "redux";
import { ILoading } from "common/typings/App";

interface ICommonState {
  isSubmitted: boolean;
  actionSuccess: boolean;
  isLoading: boolean;
  isActive: boolean;
  loading: ILoading;
  progress: number;
}

const initialState: ICommonState = {
  isSubmitted: false,
  actionSuccess: false,
  isLoading: false,
  isActive: false,
  loading: {
    table: false,
    uploadVideo: false,
    uploadImage: false,
    remove: false,
    create: false,
    update: false,
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
      case types.LOADING:
        draft.loading = action.payload;
        break;
      case types.SET_PROGRESS:
        draft.progress = action.payload;
        break;
      default:
        break;
    }
  });

export default reducer;
