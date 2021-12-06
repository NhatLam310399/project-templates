import * as types from "@redux/types/contact";
import { ICreateContact } from "@common/typings";

export const createContact = (payload: ICreateContact) => ({
  type: types.CREATE_CONTACT,
  payload,
});
