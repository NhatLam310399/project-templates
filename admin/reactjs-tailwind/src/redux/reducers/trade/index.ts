import producer from "immer";
import * as types from "redux/types/trade";
import { ITrade } from "common/typings";
import { AnyAction } from "redux";

interface ITradeProps {
  trades: {
    results: ITrade[];
    totalCount: number;
  };
  hotTrades: {
    results: ITrade[];
    totalCount: number;
  };
}

const initialState: ITradeProps = {
  trades: {
    results: [],
    totalCount: 0,
  },
  hotTrades: {
    results: [],
    totalCount: 0,
  },
};

export default (state = initialState, actions: AnyAction) =>
  producer(state, draft => {
    switch (actions.type) {
      case types.GET_ALL_TRADE_SUCCESS:
        draft.trades = actions.payload;
        break;
      case types.GET_ALL_HOT_TRADE_SUCCESS:
        draft.hotTrades = actions.payload;
        break;
      default:
        break;
    }
  });
