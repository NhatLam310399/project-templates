import { IBasicDocumentType, IMongoObjectId } from "common/typings";

export interface IOrders {
  _id?: IMongoObjectId;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  transportFee?: number;
  totalPrice?: number;
  paymentMethods?: string;
  status?: boolean;
  basicDocument?: IBasicDocumentType;
  dateOfPayment?: Date;
  paymentDetail?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IFilterOrders {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  status?: boolean;
  basicDocumentId?: string;
  modeOfTransportation?: string;
  paymentMethods?: string;
}

export interface IGetAllOrders {
  filterOrder?: IFilterOrders;
  page?: number;
  size?: number;
}
