/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IAccount } from "common/typings";
import { removeUserCookies, setUserCookies } from "common/utils/auth";
import produce from "immer";
import { AnyAction } from "redux";
import * as types from "./actionTypes";

export interface authStateType {
  currentUser?: IAccount | null;
  isLogoutAction: boolean;
}

const initial: authStateType = {
  currentUser: null,
  isLogoutAction: false,
};

const auth = (state = initial, action: AnyAction) =>
  produce(state, draft => {
    const loginSuccess = () => {
      draft.currentUser = action.payload;
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
      default:
        return draft;
    }
  });

export default auth;
