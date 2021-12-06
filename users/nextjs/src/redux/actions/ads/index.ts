import * as types from "@redux/types/ads";
import { IGetAdsAll, IGetAdsByLocation } from "@common/typings";

export const getAdAll = (payload: IGetAdsAll) => ({
  type: types.GET_ADS_ALL,
  payload,
});

export const getAdAllSuccess = <T>(payload: T) => ({
  type: types.GET_ADS_ALL_SUCCESS,
  payload,
});

export const getAdsByLocation = (payload: IGetAdsByLocation) => ({
  type: types.GET_ADS_BY_LOCATION,
  payload,
});

export const getAdsByLocationSuccess = <T>(payload: T) => ({
  type: types.GET_ADS_BY_LOCATION_SUCCESS,
  payload,
});

export const getAdsJobPage = (payload: IGetAdsByLocation) => ({
  type: types.GET_ADS_JOB_PAGE,
  payload,
});

export const getAdsJobPageSuccess = <T>(payload: T) => ({
  type: types.GET_ADS_JOB_PAGE_SUCCESS,
  payload,
});
