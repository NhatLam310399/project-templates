import { IMongoObjectId } from "common/typings";

export interface ITypeUser {
  _id?: IMongoObjectId;
  name: string;
  code?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITypeUserInput {
  name?: string;
}

export interface ICreateTypeUser {
  typeUserCreateInput: ITypeUserInput;
}

export interface IUpdateTypeUser {
  id: string;
  typeUserUpdateInput: ITypeUserInput;
}

export interface IGetAllTypeUser {
  page?: number;
  size?: number;
}
