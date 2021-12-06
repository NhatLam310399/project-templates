/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IAccount } from "@common/typings";
import produce from "immer";
import { AnyAction } from "redux";
import * as types from "@redux/types/auth";
import { setUserCookies, removeUserCookies } from "@common/utils/auth";

export interface authStateType {
  currentUser: IAccount | null;
  isAuthenticated: boolean;
}

const initial: authStateType = {
  currentUser: null,
  isAuthenticated: false,
};

const auth = (state = initial, action: AnyAction) =>
  produce(state, (draft) => {
    const loginSuccess = () => {
      const payload: IAccount = action.payload;
      draft.currentUser = payload;
      draft.isAuthenticated = true;
      setUserCookies(action.payload);
    };
    switch (action.type) {
      case types.LOGIN_SUCCESS:
        loginSuccess();
        break;
      case types.GET_TOKEN_SUCCESS:
        loginSuccess();
        break;
      case types.REFRESH_TOKEN_SUCCESS:
        loginSuccess();
        break;
      case types.GET_CURRENT_USER:
        const payload: IAccount = action.payload;
        draft.currentUser = payload;
        break;
      case types.REMOVE_CURRENT_USER:
        draft.currentUser = null;
        draft.isAuthenticated = false;
        removeUserCookies();
        break;
      default:
        return draft;
    }
  });

export default auth;
