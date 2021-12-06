import {
  GET_ALL_HELP_CENTER_LEVEL1,
  GET_ALL_HELP_CENTER_LEVEL1_SUCCESS,
  GET_ALL_HELP_CENTER_LEVEL2,
  GET_ALL_HELP_CENTER_LEVEL2_SUCCESS,
  ADD_TITLE_LINK,
  SEARCH_ALL_ARTICLE,
  SEARCH_ALL_ARTICLE_SUCCESS,
  GET_ALL_ARTICLE,
  GET_ALL_ARTICLE_SUCCESS,
} from "redux/types/help";
import { IArticle, IHelpCenterLevel1, IHelpCenterLevel2 } from "typings";

export const getAllHelpCenterLevel1 = <T>(payload: T) => {
  return {
    type: GET_ALL_HELP_CENTER_LEVEL1,
    payload,
  };
};

export const getAllHelpCenterLevel1Success = (payload: IHelpCenterLevel1[]) => {
  return {
    type: GET_ALL_HELP_CENTER_LEVEL1_SUCCESS,
    payload,
  };
};

export const getAllHelpCenterLevel2 = <T>(payload: T) => {
  return {
    type: GET_ALL_HELP_CENTER_LEVEL2,
    payload,
  };
};

export const getAllHelpCenterLevel2Success = (payload: IHelpCenterLevel2[]) => {
  return {
    type: GET_ALL_HELP_CENTER_LEVEL2_SUCCESS,
    payload,
  };
};

export const getAllArticle = <T>(payload: T) => {
  return {
    type: GET_ALL_ARTICLE,
    payload,
  };
};

export const getAllArticleSuccess = (payload: IArticle[]) => {
  return {
    type: GET_ALL_ARTICLE_SUCCESS,
    payload,
  };
};

export const searchAllArticle = <T>(payload: T) => {
  return {
    type: SEARCH_ALL_ARTICLE,
    payload,
  };
};

export const searchAllArticleSuccess = (payload: IArticle[]) => {
  return {
    type: SEARCH_ALL_ARTICLE_SUCCESS,
    payload,
  };
};

export const addLink = (payload: { title: string; link: string }[]) => {
  return {
    type: ADD_TITLE_LINK,
    payload,
  };
};
