import { IMongoObjectId, IUser } from "common/typings";

export interface IMessage {
  _id?: IMongoObjectId;
  userReceived?: IUser;
  userSend?: IUser;
  content?: string;
  time?: Date;
  slug?: string;
  keywords?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMessageInput {
  userReceived?: string;
  userSend?: string;
  content?: string;
  time?: Date;
  slug?: string;
  keywords?: string;
}

export interface ICreateMessage {
  messageCreateInput: IMessageInput;
}

export interface IUpdateMessage {
  id: string;
  messageUpdateInput: IMessageInput;
}

export interface IFilterMessage {
  content?: string;
  slug?: string;
  status?: boolean;
}

export interface IGetAllMessage {
  filterMessage?: IFilterMessage;
  page?: number;
  size?: number;
}
