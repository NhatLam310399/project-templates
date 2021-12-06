import { IUser } from "..";

export interface IManagerJob {
  _id?: string;
  _candidate?: [IUser];
  _profile?: [IRecruitment];
  createdAt?: Date;
  updateAt?: Date;
}
