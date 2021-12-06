import producer from "immer";
import * as types from "redux/types/register";

interface IRegister {
  currentData: any;
}

const initial: IRegister = {
  currentData: null,
};

const register = (state = initial, action: any) =>
  producer(state, draft => {
    switch (action.type) {
      case types.ACTION_SET_REGISTER_DATA:
        draft.currentData = action.payload;
        break;
      case types.ACTION_REMOVE_REGISTER_DATA:
        draft.currentData = null;
        break;
      default:
        return draft;
    }
  });

export default register;
