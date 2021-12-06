import produce from "immer";
import { AnyAction } from "redux";
import { ICategory, IClipArt } from "typings";
import * as types from "redux/types/clipArt";

export interface IAdsState {
  clipArts: {
    results: IClipArt[];
    totalCount: number;
  },
  categories: {
    results: ICategory[];
    totalCount: number;
  }
}

const initialState: IAdsState = {
  clipArts: {
    results: [],
    totalCount: 0,
  },
  categories: {
    results: [],
    totalCount: 0,
  }
};

const clipArt = (state = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_ALL_CATEGORY_SUCCESS:
        draft.categories = action.payload;
        break;
      case types.GET_ALL_CLIP_ART_SUCCESS:
        draft.clipArts = action.payload;
        break;
    }
  });

export default clipArt;
