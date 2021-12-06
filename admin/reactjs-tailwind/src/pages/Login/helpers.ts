import { IGraphQLResponse, IUser } from "common/typings";
import { getIdByPhoneNumber } from "services/users";

export const getIdByPhoneNumberService = async (
  phoneNumber: string,
): Promise<IUser | null> => {
  const response: IGraphQLResponse = await getIdByPhoneNumber({ phoneNumber });
  const { getIdByPhoneNumber: result = null } = response?.data || {};
  return result;
};
