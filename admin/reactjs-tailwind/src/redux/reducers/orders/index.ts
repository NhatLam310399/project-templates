import produce from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/orders";
import { IOrders } from "common/typings";

interface IOrdersState {
  allOrders: {
    results: IOrders[];
    totalCount: number;
  };
}

const initialState: IOrdersState = {
  allOrders: {
    results: [],
    totalCount: 0,
  },
};

const ordersReducer = (state = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_ALL_ORDERS_SUCCESS:
        draft.allOrders = action.payload;
        break;

      default:
        break;
    }
  });

export default ordersReducer;
