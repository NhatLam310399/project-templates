import producer from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/users";
import { IUser } from "common/typings";

interface IListUserReducer {
  users: {
    results: IUser[];
    totalCount: number;
  };
  user: IUser | null;
}

const initialState: IListUserReducer = {
  users: {
    results: [],
    totalCount: 0,
  },
  user: null,
};

const listUsers = (state = initialState, actions: AnyAction) =>
  producer(state, draft => {
    switch (actions.type) {
      case types.GET_ALL_USER_HAS_PERMISSIONS_SUCCESS:
        draft.users = actions.payload;
        break;
      case types.GET_ALL_USER_SUCCESS:
        draft.users = actions.payload;
        break;
      case types.GET_USER_SUCCESS:
        draft.user = actions.payload;
        break;
      default:
        break;
    }
  });

export default listUsers;
