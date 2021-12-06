import {
  IGetCompanyByBoss,
  IGetKaraokeByBoss,
  IGraphQLResponse,
  IPlace,
} from "common/typings";
import * as services from "services/place";

export const getKaraokeByBossService = async (
  payload: IGetKaraokeByBoss,
): Promise<IPlace | null> => {
  const response: IGraphQLResponse = await services.getKaraokeByBoss(payload);
  const { getKaraokeByBoss: result = null } = response?.data || {};
  return result;
};

export const getCompanyByBossService = async (
  payload: IGetCompanyByBoss,
): Promise<IPlace | null> => {
  const response: IGraphQLResponse = await services.getCompanyByBoss(payload);
  const { getCompanyByBoss: result = null } = response?.data || {};
  return result;
};
