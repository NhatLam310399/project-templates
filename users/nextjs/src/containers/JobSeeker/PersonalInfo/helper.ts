import { IGraphQLResponse } from "@common/typings"
import { checkProfileUserExist } from "@services/user"
import { checkRecordUserExist } from "@services/record"

export const checkProfileUserService = async () => {
  const response: IGraphQLResponse = await checkProfileUserExist();
  const { checkProfileUserExist: result } = response?.data || {};
  return result;
}
export const checkRecordUserService = async () => {
  const response: IGraphQLResponse = await checkRecordUserExist();
  const { checkRecordUserExist: result } = response?.data || {};
  return result;
}

export const addLocalStorage = (value: number) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("RECORD_PROFILE_EXIST", String(value));
}