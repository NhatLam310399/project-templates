import produce from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/categories";
import { ICategory } from "common/typings";

interface categoriesState {
  categories: {
    result: ICategory[];
    totalCount: number;
  };
}

const initialState: categoriesState = {
  categories: {
    result: [],
    totalCount: 0,
  },
};

const categoriesReducer = (state = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_ALL_CATEGORIES_SUCCESS:
        draft.categories = action.payload;
        break;
      default:
        break;
    }
  });

export default categoriesReducer;
