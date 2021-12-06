import produce from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/trade";
import { IProduct, ITrade } from "common/typings";

interface tradeState {
  products: {
    results: IProduct[];
    totalCount: number;
  };
  allTrade: {
    results: ITrade[];
    totalCount: number;
  };
}

const initialState: tradeState = {
  products: {
    results: [],
    totalCount: 0,
  },
  allTrade: {
    results: [],
    totalCount: 0,
  },
};

const tradeReducer = (state = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_ALL_PRODUCT_SUCCESS:
        draft.products = action.payload;
        break;
      case types.GET_ALL_TRADE_SUCCESS:
        draft.allTrade = action.payload;
        break;

      default:
        break;
    }
  });

export default tradeReducer;
