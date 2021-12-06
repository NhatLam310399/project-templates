import { IGetSEO } from "@common/typings";
import * as types from "@redux/types/contentWebsite";
import { IGetAllContentWebsite } from "@common/typings";

export const getAllContentWebsite = (payload: IGetAllContentWebsite) => ({
  type: types.GET_CONTENT_WEBSITE,
  payload,
});

export const getAllContentWebsiteSuccess = <T>(payload: T) => ({
  type: types.GET_CONTENT_WEBSITE_SUCCESS,
  payload,
});

export const getSeoWebsite = (payload: IGetSEO) => ({
  type: types.GET_SEO_WEBSITE,
  payload,
});

export const getSeoWebsiteSuccess = <T>(payload: T) => ({
  type: types.GET_SEO_WEBSITE_SUCCESS,
  payload,
});
