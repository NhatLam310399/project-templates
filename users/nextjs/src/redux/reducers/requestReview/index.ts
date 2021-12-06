import produce from "immer";
import { AnyAction } from "redux";

import * as types from "@redux/types/requestReview";
import { IEvaluate, IRequestReview } from "@common/typings";

interface IRequestReviewState {
  requestReviewList: {
    results: IRequestReview[];
    totalCount: number;
  };
  listEvaluate: IEvaluate[];
}

const initialState: IRequestReviewState = {
  requestReviewList: {
    results: [],
    totalCount: 0,
  },
  listEvaluate: [],
};

const requestReviewReducer = (state = initialState, action: AnyAction) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case types.GET_ALL_REQUEST_REVIEW_SUCCESS:
        draft.requestReviewList = action.payload;
        break;
      case types.GET_EVALUATE_BY_USER_SUCCESS:
        draft.listEvaluate = action.payload;
        break;
      default:
        break;
    }
  });
};

export default requestReviewReducer;
