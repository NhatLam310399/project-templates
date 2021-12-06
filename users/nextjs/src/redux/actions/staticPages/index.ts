import * as types from "@redux/types/staticPages";
import { IGetBySlug, IGetAllPages } from "@common/typings";

export const getAllStaticPages = (payload: IGetAllPages) => ({
  type: types.GET_ALL_STATIC_PAGES,
  payload,
});

export const getAllStaticPagesSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_STATIC_PAGES_SUCCESS,
  payload,
});

export const getStaticPageBySlug = (payload: IGetBySlug) => ({
  type: types.GET_STATIC_PAGE_BY_SLUG,
  payload,
});

export const getStaticPageBySlugSuccess = <T>(payload: T) => ({
  type: types.GET_STATIC_PAGE_BY_SLUG_SUCCESS,
  payload,
});
