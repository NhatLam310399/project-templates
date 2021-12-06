import * as types from "redux/types/orders";
import { IById, IGetAllOrders } from "common/typings";

export const getAllOrders = (payload: IGetAllOrders) => ({
  type: types.GET_ALL_ORDERS,
  payload,
});

export const getAllOrdersSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_ORDERS_SUCCESS,
  payload,
});

export const deleteOrder = (payload: IById) => ({
  type: types.DELETE_ORDER,
  payload,
});
