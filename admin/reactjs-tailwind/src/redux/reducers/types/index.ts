import producer from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/types";
import { ITypes, ITypeUser } from "common/typings";

interface ITypesReducer {
  allTypeUser: {
    results: ITypeUser[];
    totalCount: number;
  };
  listTypes: {
    results: ITypes[];
    totalCount: number;
    loading: boolean;
  };
}

const initialState: ITypesReducer = {
  allTypeUser: {
    results: [],
    totalCount: 0,
  },
  listTypes: {
    results: [],
    totalCount: 0,
    loading: true,
  },
};

const typesReducer = (state = initialState, actions: AnyAction) =>
  producer(state, draft => {
    switch (actions.type) {
      case types.GET_TYPES_BY_CODE_SUCCESS:
        draft.listTypes = { ...actions.payload, loading: false };
        break;
      case types.GET_ALL_TYPE_USER_SUCCESS:
        draft.allTypeUser = actions.payload;
        break;
      default:
        break;
    }
  });

export default typesReducer;
