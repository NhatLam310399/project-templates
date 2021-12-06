import { IById, ICreateRoom, IUpdateRoom, IGetAllRoom } from "common/typings";

import * as types from "redux/types/room";

export const getAllRoom = (payload: IGetAllRoom) => ({
  type: types.GET_ALL_ROOM,
  payload,
});

export const getAllRoomSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_ROOM_SUCCESS,
  payload,
});

export const createRoom = (payload: ICreateRoom) => ({
  type: types.CREATE_ROOM,
  payload,
});

export const updateRoom = (payload: IUpdateRoom) => ({
  type: types.UPDATE_ROOM,
  payload,
});

export const deleteRoomById = (payload: IById) => ({
  type: types.DELETE_ROOM_BY_ID,
  payload,
});
