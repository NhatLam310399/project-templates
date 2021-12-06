import {
  IById,
  IGetAllTrade,
  ICreateTrade,
  IUpdateTrade,
} from "common/typings";

import * as types from "redux/types/trade";

export const getAllTrade = (payload: IGetAllTrade) => ({
  type: types.GET_ALL_TRADE,
  payload,
});

export const getAllTradeSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_TRADE_SUCCESS,
  payload,
});
export const getAllHotTrade = (payload: IGetAllTrade) => ({
  type: types.GET_ALL_HOT_TRADE,
  payload,
});

export const getAllHotTradeSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_HOT_TRADE_SUCCESS,
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
