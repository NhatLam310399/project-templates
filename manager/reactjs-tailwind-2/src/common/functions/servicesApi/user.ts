import {
  ICheckEmailExistByAdmin,
  IGetIdByPhoneNumber,
  IGraphQLResponse,
  IUser,
} from "common/typings";
import * as services from "services/user";

export const getIdByPhoneNumberService = async (
  payload: IGetIdByPhoneNumber,
): Promise<IUser | null> => {
  const response: IGraphQLResponse = await services.getIdByPhoneNumber(payload);
  const { getIdByPhoneNumber: result = null } = response?.data || {};
  return result;
};

export const checkEmailExistByAdminService = async (
  payload: ICheckEmailExistByAdmin,
): Promise<boolean> => {
  const response: IGraphQLResponse = await services.checkEmailExistByAdmin(
    payload,
  );
  const { checkEmailExistByAdmin: result = false } = response?.data || {};
  return result;
};
