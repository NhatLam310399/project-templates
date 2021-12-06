import produce from "immer";
import * as types from "redux/types/product";
import { AnyAction } from "redux";
import { IProductSchema } from "typings";

interface IProductState {
  productSchemas: {
    results: IProductSchema[];
    totalCount: number;
  };
}

const initialState: IProductState = {
  productSchemas: {
    results: [],
    totalCount: 0,
  },
};

const product = (state = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_ALL_PRODUCT_SCHEMAS_SUCCESS:
        draft.productSchemas = action.payload;
        break;
      default:
    }
  });

export default product;
