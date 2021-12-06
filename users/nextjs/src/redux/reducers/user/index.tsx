import produce from "immer";
import { AnyAction } from "redux";
import { ICompany, IUser } from "@common/typings";
import * as types from "@redux/types/user";

export interface IUserState {
  user: IUser;
}
const initial: IUserState = {
  user: {},
};
const location = (state = initial, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.GET_USER_PROFILE_SUCCESS:
        draft.user = action.payload;
        break;
      default:
        break;
    }
  });

export default location;
