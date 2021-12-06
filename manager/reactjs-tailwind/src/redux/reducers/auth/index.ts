import produce from "immer";
import { AnyAction } from "redux";
import { IAccount, IUser } from "typings";
import { removeUserCookies, setUserCookies } from "common/utils/auth";
import * as types from "redux/types/auth";

export interface IAuthStates {
  currentUser: IAccount | null;
  accountProfile: IUser | null;
  isLogoutAction: boolean;
}

const initialState: IAuthStates = {
  currentUser: null,
  accountProfile: null,
  isLogoutAction: false,
};

const authReducer = (state = initialState, action: AnyAction) =>
  produce(state, draft => {
    const loginSuccess = () => {
      const payload: IAccount = action.payload;
      draft.currentUser = payload;
      setUserCookies(action.payload);
      draft.isLogoutAction = false;
    };

    switch (action.type) {
      case types.GET_TOKEN_SUCCESS:
        loginSuccess();
        break;
      case types.LOGIN_SUCCESS:
        loginSuccess();
        break;
      case types.REFRESH_TOKEN_SUCCESS:
        loginSuccess();
        break;
      case types.REMOVE_CURRENT_USER:
        draft.currentUser = null;
        draft.isLogoutAction = true;
        removeUserCookies();
        break;
      case types.GET_ACCOUNT_PROFILE_SUCCESS:
        draft.accountProfile = action.payload;
        break;
      default:
        return draft;
    }
  });

export default authReducer;
