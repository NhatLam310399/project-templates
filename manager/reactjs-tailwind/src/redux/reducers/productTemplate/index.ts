import produce from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/productTemplate";
import { IProductSchema, IStoreTemplateDesigned } from "typings";

interface IProductTemplateState {
  productSchema: IProductSchema | null;
  isContinueStepPreview: boolean;
  storeTemplateDesigned: IStoreTemplateDesigned;
}

const initialState: IProductTemplateState = {
  productSchema: null,
  isContinueStepPreview: false,
  storeTemplateDesigned: {
    productDesignSchemaId: "",
    sides: [],
    colors: [],
  },
};

const productTemplate = (state = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SET_PRODUCT_SCHEMA:
        draft.productSchema = action.payload;
        break;

      case types.SET_STORE_TEMPLATE_DESIGNED:
        draft.storeTemplateDesigned = action.payload;
        break;

      case types.SET_IS_CONTINUE_STEP_PREVIEW:
        draft.isContinueStepPreview = action.payload;
        break;
    }
  });

export default productTemplate;
