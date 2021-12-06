import { IGetKaraokeByBoss, IUpdatePlace } from "common/typings";
import * as types from "redux/types/place";

export const getKaraokeByBoss = (payload: IGetKaraokeByBoss) => ({
  type: types.GET_KARAOKE_BY_BOSS,
  payload,
});

export const getKaraokeByBossSuccess = (payload: IGetKaraokeByBoss) => ({
  type: types.GET_KARAOKE_BY_BOSS_SUCCESS,
  payload,
});

export const updateKaraoke = (payload: IUpdatePlace) => ({
  type: types.UPDATE_KARAOKE,
  payload,
});

export const updateCompany = (payload: IUpdatePlace) => ({
  type: types.UPDATE_COMPANY,
  payload,
});

export const cleanPlace = () => ({
  type: types.CLEAN_PLACE,
});
