import { IPermissionType } from "constants/users/permissions";
import {
  IMongoObjectId,
  IProvince,
  IDistrict,
  IWard,
  IStreet,
  ICustomSizeImages,
  IUpload,
  ILocationTypeInput,
  ICustomSizeImagesInput,
} from "typings";

export interface IUser {
  _id?: IMongoObjectId;
  clientId?: string;
  provider?: string;
  birthday?: Date | null;
  gender?: string;
  challengePoint?: number;
  urlAvt?: ICustomSizeImages;
  identifyCard?: string;
  displayName?: string;
  username?: string;
  email?: string;
  fullName?: string;
  phoneNumber?: string;
  language?: string;
  permission?: IPermissionType;
  province?: IProvince;
  district?: IDistrict;
  lastLogin?: number;
  access?: string;
  ward?: IWard;
  street?: IStreet;
  enabled?: boolean;
  nameOnBankCard?: string;
  bankCardNumber?: string;
  bankName?: string;
  tradingAddress?: string;
  createdAt?: Date;
  updateddAt?: Date;
  password?: string;
}
export interface IUserResults {
  results?: IUser[];
  totalCount?: number;
}
export interface IGetAllUserHasPermissions {
  permissions: IPermissionType[];
  page?: number;
  size?: number;
}
export interface IUserInput {
  username?: string;
  phoneNumber?: string;
  email?: string;
  password?: string;
  displayName?: string;
  urlAvt?: IUpload;
  identifyCard?: string;
  birthday?: Date | null;
  language?: string;
  locationTypeInput?: ILocationTypeInput;
  nameOnBankCard?: string;
  bankCardNumber?: string;
  bankName?: string;
  tradingAddress?: string;
  gender?: string;
  customSizeForUploadImage?: ICustomSizeImagesInput;
  permission?: IPermissionType;
  agreePolicy?: boolean;
  subscribe?: boolean;
  description?: string;
  fullName?: string;
}
export interface ICreateUser {
  createUserInput?: IUserInput;
}
export interface IUpdateUser {
  id: IMongoObjectId | null;
  updateUserInput?: IUserInput;
}
export interface IDeleteUser {
  id: IMongoObjectId;
}

export interface IFilterUser {
  username?: string;
  phoneNumber: string;
}
export interface IGetAllUser {
  filterUser: IFilterUser;
  page?: number;
  size?: number;
}
export interface IUpdatePasswordUser {
  idUser: string;
  password: string;
}

export interface ICheckExistEmail {
  email: string;
}
