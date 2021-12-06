import producer from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/closingTime";
import { IClosingTime } from "common/typings";

interface IClosingTimeProps {
  allClosingTime: {
    results: IClosingTime[];
    totalCount: number;
  };
}

const initialState: IClosingTimeProps = {
  allClosingTime: {
    results: [],
    totalCount: 0,
  },
};

export default (state = initialState, actions: AnyAction) =>
  producer(state, draft => {
    switch (actions.type) {
      case types.GET_ALL_CLOSING_TIME_SUCCESS:
        draft.allClosingTime = actions.payload;
        break;
      default:
        break;
    }
  });
