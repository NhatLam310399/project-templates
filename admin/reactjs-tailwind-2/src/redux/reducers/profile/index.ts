import produce from "immer";
import * as types from "redux/types/profile";
import { AnyAction } from "redux";
import { IUser } from "common/formatTypes";

interface IProfileState {
    profile: IUser | null;
}

const initialState: IProfileState = {
    profile: null,
};

const profileReducer = (state = initialState, action: AnyAction) =>
    produce(state, draft => {
        switch (action.type) {
            case types.GET_PROFILE_SUCCESS:
                draft.profile = action.payload;
                break;
            case types.REMOVE_PROFILE:
                draft.profile = null;
                break;
            default:
                break;
        }
    });

export default profileReducer;
