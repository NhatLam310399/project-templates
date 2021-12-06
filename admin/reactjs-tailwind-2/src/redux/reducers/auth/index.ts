/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IAuth } from "common/formatTypes";
import produce from "immer";
import { AnyAction } from "redux";
import * as types from "./actionTypes";

export interface authStateType {
    currentUser?: IAuth | null;
    isAuthenticated: boolean;
}

const initial: authStateType = {
    currentUser: null,
    isAuthenticated: false,
};

const auth = (state = initial, action: AnyAction) =>
    produce(state, draft => {
        switch (action.type) {
            case types.GET_TOKEN_SUCCESS:
                draft.currentUser = action.payload;
                draft.isAuthenticated = true;
                break;
            case types.REMOVE_CURRENT_USER:
                draft.currentUser = null;
                draft.isAuthenticated = false;
                break;
            default:
                return draft;
        }
    });

export default auth;
