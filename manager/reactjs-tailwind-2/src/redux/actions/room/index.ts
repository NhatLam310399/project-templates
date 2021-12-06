import {
  IById,
  ICreateRoom,
  IGetRoomByKaraokeId,
  IUpdateRoom,
} from "common/typings";

import * as types from "redux/types/room";

export const getRoomByKaraokeId = (payload: IGetRoomByKaraokeId) => ({
  type: types.GET_ROOM_BY_KARAOKE,
  payload,
});

export const getRoomByKaraokeSuccess = <T>(payload: T) => ({
  type: types.GET_ROOM_BY_KARAOKE_SUCCESS,
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
