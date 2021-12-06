import producer from "immer";
import * as types from "redux/types/users";
import { AnyAction } from "redux";
import { ICustomer, IUser } from "common/typings";

interface IUserProps {
  user: IUser | null;
  customerDetail: ICustomer | null;
}

const initialState: IUserProps = {
  user: null,
  customerDetail: null,
};

export default (state = initialState, actions: AnyAction) =>
  producer(state, draft => {
    switch (actions.type) {
      case types.GET_USER_SUCCESS:
        draft.user = actions.payload;
        break;
      default:
        break;
    }
  });
