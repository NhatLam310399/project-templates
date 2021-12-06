import { IMongoObjectId, IPlace, ITrade, IUser } from "common/typings";

export interface ITransactionType {
  _id?: IMongoObjectId;
  userBuy?: IUser;
  companySell?: IPlace;
  trade?: ITrade;
  price?: number;
  keywords?: string;
  slug?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IFilterTransaction {
  userBuy?: string;
  companySell?: string;
  trade?: string;
  tradeName?: string;
}

export interface IGetAllTransaction {
  filterTransaction?: IFilterTransaction;
  page?: number;
  size?: number;
}
