import produce from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/message";
import { IMessage } from "common/typings";

interface IMessageState {
  allMessage: {
    results: IMessage[];
    totalCount: number;
  };
}

const initialState: IMessageState = {
  allMessage: {
    results: [],
    totalCount: 0,
  },
};

const messageReducer = (state = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_ALL_MESSAGE_SUCCESS:
        draft.allMessage = action.payload;
        break;

      default:
        break;
    }
  });

export default messageReducer;
