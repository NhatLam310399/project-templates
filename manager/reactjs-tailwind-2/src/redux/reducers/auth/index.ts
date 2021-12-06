import { IAccount } from "common/typings";
import { removeUserCookies, setUserCookies } from "common/utils/auth";
import produce from "immer";
import * as types from "redux/types/auth";

export interface authStateType {
  currentUser: IAccount | null;
  isLogoutAction?: boolean;
}

const initial: authStateType = {
  currentUser: null,
  isLogoutAction: false,
};

const auth = (state = initial, action: any) =>
  produce(state, draft => {
    const loginSuccess = () => {
      draft.currentUser = action.payload;
      draft.isLogoutAction = false;
    };
    switch (action.type) {
      case types.GET_TOKEN_SUCCESS:
        loginSuccess();
        break;
      case types.REMOVE_CURRENT_USER:
        draft.currentUser = null;
        draft.isLogoutAction = true;
        removeUserCookies();
        break;
      default:
        break;
    }
  });

export default auth;
