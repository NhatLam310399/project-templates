import { IUserInput } from "common/typings";

export interface IUpdateUserProfile {
  updateUserInput: IUserInput;
}

export interface IUpdateUserProfileByAdmin {
  id: string;
  password: string;
  updateUserInput: IUserInput;
}
