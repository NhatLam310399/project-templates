import * as types from "redux/types/trade";
import {
  IById,
  ICreateTrade,
  IGetAllTrade,
  IUpdateTrade,
} from "common/typings";

export const getAllTrade = (payload: IGetAllTrade) => ({
  type: types.GET_ALL_TRADE,
  payload,
});

export const getAllTradeSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_TRADE_SUCCESS,
  payload,
});

export const createTrade = (payload: ICreateTrade) => ({
  type: types.CREATE_TRADE,
  payload,
});

export const updateTrade = (payload: IUpdateTrade) => ({
  type: types.UPDATE_TRADE,
  payload,
});

export const deleteTrade = (payload: IById) => ({
  type: types.DELETE_TRADE,
  payload,
});
