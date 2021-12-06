/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as types from "redux/types/ads";
import {
  IById,
  ICreateAds,
  IGetAdsAll,
  IGetAdsAllByLocation,
  IUpdateAds,
} from "typings";

export const getAdsAll = (payload: IGetAdsAll) => ({
  type: types.GET_ADS_ALL,
  payload,
});

export const getAdsAllByLocation = (payload: IGetAdsAllByLocation) => ({
  type: types.GET_ADS_ALL_BY_LOCATION,
  payload,
});

export const getAdsAllSuccess = <T>(payload: T) => ({
  type: types.GET_ADS_ALL_SUCCESS,
  payload,
});

export const getAdsById = (payload: IById) => ({
  type: types.GET_ADS_BY_ID,
  payload,
});

export const getAdsSuccess = <T>(payload: T) => ({
  type: types.GET_ADS_SUCCESS,
  payload,
});

export const createAds = (payload: ICreateAds) => ({
  type: types.CREATE_ADS,
  payload,
});

export const updateAds = (payload: IUpdateAds) => ({
  type: types.UPDATE_ADS,
  payload,
});

export const removeAds = (payload: IById) => ({
  type: types.REMOVE_ADS,
  payload,
});
