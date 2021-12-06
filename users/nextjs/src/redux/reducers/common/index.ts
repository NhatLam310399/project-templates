import produce from "immer";
import * as types from "@redux/types/common";
import { AnyAction } from "redux";

interface ICommonState {
  isSubmitted: boolean;
  actionSuccess: boolean;
  isLoading: boolean;
  isExtendEmployerDrawer: boolean;
  isOpenNotification: boolean;
}

const initialState: ICommonState = {
  isSubmitted: false,
  actionSuccess: false,
  isLoading: false,
  isExtendEmployerDrawer: false,
  isOpenNotification: false,
};

const reducer = (state = initialState, action: AnyAction) =>
  produce(state, (draft) => {
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
      case types.SET_EXTEND_EMPLOYER_DRAWER:
        draft.isExtendEmployerDrawer = action.payload;
        break;

      case types.SET_OPEN_NOTIFICATION:
        draft.isOpenNotification = action.payload;
        break;
    }
  });

export default reducer;
