import * as types from "redux/types/message";
import { IById } from "common/typings";
import {
  IGetAllMessage,
  ICreateMessage,
  IUpdateMessage,
} from "common/typings/Message";

export const getAllMessage = (payload: IGetAllMessage) => ({
  type: types.GET_ALL_MESSAGE,
  payload,
});

export const getAllMessageSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_MESSAGE_SUCCESS,
  payload,
});

export const createMessage = (payload: ICreateMessage) => ({
  type: types.CREATE_MESSAGE,
  payload,
});
export const updateMessage = (payload: IUpdateMessage) => ({
  type: types.UPDATE_MESSAGE,
  payload,
});
export const deleteMessageById = (payload: IById) => ({
  type: types.DELETE_MESSAGE_BY_ID,
  payload,
});
