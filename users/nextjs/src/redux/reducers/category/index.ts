import produce from "immer";
import { AnyAction } from "redux";
import * as types from "@redux/types/category";
import { ICategoryLevel1, ICategoryLevel2 } from "@common/typings";

interface categoryReducer {
  categoryLevel1: {
    totalCount: number;
    results: ICategoryLevel1[];
  };
  categoryLevel2: {
    totalCount: number;
    results: ICategoryLevel2[];
  };
  categorySelected: ICategoryLevel2;
}

const initialState: categoryReducer = {
  categoryLevel1: {
    totalCount: 0,
    results: [],
  },
  categoryLevel2: {
    totalCount: 0,
    results: [],
  },
  categorySelected: null,
};

const reducer = (state = initialState, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.GET_ALL_CATEGORY_1_JOB_SUCCESS:
        draft.categoryLevel1 = action.payload;
        break;
      case types.GET_ALL_CATEGORY_2_JOB_SUCCESS:
        draft.categoryLevel2 = action.payload;
        break;
      case types.SET_CATEGORY_SELECTED:
        draft.categorySelected = action.payload;
        break;
      default:
        break;
    }
  });

export default reducer;
// case types.GET_ALL_CATEGORY_SUCCESS:
//   draft.categoryLevel1 = action.payload.category1;
//   draft.categoryLevel2 = action.payload.category2;
