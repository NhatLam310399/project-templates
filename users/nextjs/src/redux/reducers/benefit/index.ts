import produce from "immer";
import { AnyAction } from "redux";

import * as types from "@redux/types/benefit";
import { IBenefit } from "@common/typings";

interface IBenefitReducer {
  benefitList: {
    results: IBenefit[];
    totalCount: number;
  };
  benefit: IBenefit | null;
}

const initialState: IBenefitReducer = {
  benefitList: {
    results: [],
    totalCount: 0,
  },
  benefit: {},
};

const reducer = (state = initialState, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.GET_ALL_BENEFIT_SUCCESS:
        draft.benefitList = action.payload;
        break;

      default:
        break;
    }
  });

export default reducer;
