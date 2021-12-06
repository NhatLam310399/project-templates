import * as types from "@redux/types/blog";
import { IGetAllBlog, IGetBlogBySlug } from "@common/typings";

export const getAllBlog = (payload: IGetAllBlog) => ({
  type: types.GET_ALL_BLOG,
  payload,
});

export const getAllBlogSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_BLOG_SUCCESS,
  payload,
});

export const getBlogBySlug = (payload: IGetBlogBySlug) => ({
  type: types.GET_BLOG_BY_SLUG,
  payload,
});

export const getBlogBySlugSuccess = <T>(payload: T) => ({
  type: types.GET_BLOG_BY_SLUG_SUCCESS,
  payload,
});
