import * as types from "redux/types/product";

export const getAllProductSchemas = (payload: any) => ({
  type: types.GET_ALL_PRODUCT_SCHEMAS,
  payload,
});

export const getAllProductSchemasSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_PRODUCT_SCHEMAS_SUCCESS,
  payload,
});
