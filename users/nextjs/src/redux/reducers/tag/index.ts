import produce from "immer";
import * as types from "@redux/types/tag";
import { AnyAction } from "redux";
import { ITag } from "@common/typings";

interface TagStateType {
  allTag: {
    results: ITag[];
    totalCount: number;
  };
}

const initialState: TagStateType = {
  allTag: {
    results: [],
    totalCount: 0,
  },
};

const reducer = (state = initialState, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.GET_ALL_TAG_SUCCESS:
        draft.allTag = action.payload;
        break;
    }
  });

export default reducer;
