import * as types from "redux/types/trade";
import {
  IById,
  ICreateProduct,
  IGetAllProduct,
  IUpdateProduct,
} from "common/typings";

export const getAllProduct = (payload: IGetAllProduct) => ({
  type: types.GET_ALL_PRODUCT,
  payload,
});

export const getAllProductSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_PRODUCT_SUCCESS,
  payload,
});

export const createProduct = (payload: ICreateProduct) => ({
  type: types.CREATE_PRODUCT,
  payload,
});

export const updateProduct = (payload: IUpdateProduct) => ({
  type: types.UPDATE_PRODUCT,
  payload,
});

export const deleteProduct = (payload: IById) => ({
  type: types.DELETE_PRODUCT,
  payload,
});
