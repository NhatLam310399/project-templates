import * as types from "redux/types/productTemplate";
import { IProductSchema, IStoreTemplateDesigned } from "typings";

export const setProductSchema = (payload: IProductSchema) => ({
  type: types.SET_PRODUCT_SCHEMA,
  payload,
});

export const setIsContinueStepPreview = (payload: boolean) => ({
  type: types.SET_IS_CONTINUE_STEP_PREVIEW,
  payload,
});

export const setStoreTemplateDesigned = (
  payload: Partial<IStoreTemplateDesigned>,
) => ({
  type: types.SET_STORE_TEMPLATE_DESIGNED,
  payload,
});
