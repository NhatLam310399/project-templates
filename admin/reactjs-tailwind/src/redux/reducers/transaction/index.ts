import produce from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/transaction";
import { ITransactionType } from "common/typings";

interface ITransactionState {
  allTransaction: {
    results: ITransactionType[];
    totalCount: number;
  };
}

const initialState: ITransactionState = {
  allTransaction: {
    results: [],
    totalCount: 0,
  },
};

const transactionReducer = (state = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_ALL_TRANSACTION_SUCCESS:
        draft.allTransaction = action.payload;
        break;

      default:
        break;
    }
  });

export default transactionReducer;
