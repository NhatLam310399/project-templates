import produce from "immer";
import * as types from "redux/types/category";
import { AnyAction } from "redux";
import { ICategoryLevel1, ICategoryLevel2, ITagMenu } from "typings";

interface ICategoryState {
  selected: {
    level1?: ICategoryLevel1 | null;
    tagMenu?: ITagMenu | null;
    level2?: ICategoryLevel2 | null;
  };
  categoriesLv1: {
    results: ICategoryLevel1[];
    totalCount: number;
  };
  categoriesLv2: {
    results: ICategoryLevel2[];
    totalCount: number;
  };
  tags: {
    results: ITagMenu[];
    totalCount: number;
  };
}

const initialState: ICategoryState = {
  selected: {},
  categoriesLv1: {
    results: [],
    totalCount: 0,
  },
  categoriesLv2: {
    results: [],
    totalCount: 0,
  },
  tags: {
    results: [],
    totalCount: 0,
  },
};

const category = (state = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_ALL_CATEGORY_LV1_SUCCESS:
        draft.categoriesLv1 = action.payload;
        break;
      case types.GET_ALL_CATEGORY_LV2_SUCCESS:
        draft.categoriesLv2 = action.payload;
        break;
      case types.GET_ALL_TAG_MENU_SUCCESS:
        draft.tags = action.payload;
        break;
      case types.SET_CATEGORY_LV_1_SELECTED:
        draft.selected = {
          level1: action.payload,
        };
        break;
      case types.SET_TAG_MENU_SELECTED:
        draft.selected.tagMenu = action.payload;
        draft.selected.level2 = null;
        break;
      case types.SET_CATEGORY_LV_2_SELECTED:
        draft.selected.level2 = action.payload;
        break;
    }
  });

export default category;
