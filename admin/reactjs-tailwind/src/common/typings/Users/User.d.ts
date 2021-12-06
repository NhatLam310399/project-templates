import {
  IMongoObjectId,
  IProvince,
  IDistrict,
  IWard,
  ICustomSizeImages,
  IUpload,
  ILocationTypeInput,
  ICustomSizeImagesInput,
  ICoupon,
  IPlace,
  IDocumentType,
} from "common/typings";

export type IPermissionType =
  | "ADMIN"
  | "MANAGER"
  | "CARE_STAFF"
  | "USER"
  | "BOSS";
export interface IUser {
  _id?: IMongoObjectId;
  clientId?: string;
  provider?: string;
  birthday?: Date | null;
  gender?: string;
  urlAvt?: ICustomSizeImages;
  identifyCard?: string;
  displayName?: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
  highlight?: boolean;
  language?: string;
  permission?: IPermissionType;
  province?: IProvince;
  district?: IDistrict;
  ward?: IWard;
  street?: string;
  enabled?: boolean;
  nameOnBankCard?: string;
  bankCardNumber?: string;
  bankName?: string;
  tradingAddress?: string;
  isHot?: boolean;
  coupon?: ICoupon;
  slug?: string;
  keywords?: string;
  favouriteKaraoke?: IPlace;
  point?: number;
  deviceToken?: string;
  rate?: string;
  lastSeenAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  documents?: IDocumentType;
}
export interface IUserResults {
  results?: IUser[];
  totalCount?: number;
}
export interface IGetAllUserHasPermissions {
  permissions: IPermissionType[];
  page?: number;
  size?: number;
  filterUser?: IFilterUser;
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
  highlight?: boolean;
}
export interface ICreateUserByAdmin {
  createUserInput?: IUserInput;
}
export interface IUpdateUserByAdminInput {
  id: IMongoObjectId | null;
  updateUserInput?: IUserInput;
}
export interface IDeleteUser {
  id: IMongoObjectId;
}

export interface IFilterUser {
  username?: string;
  phoneNumber?: string;
  highlight?: boolean;
}
export interface IGetAllUser {
  filterUser: IFilterUser;
  page?: number;
  size?: number;
}
export interface ISetPerMissionForUser {
  id: string;
  permission: string;
}
export interface ISetEnableForUser {
  id: string;
  enabled: boolean;
}

export interface ISetIsHighlightForUser {
  id: string;
  isHighlight: boolean;
}

export interface IGetIdByPhoneNumber {
  phoneNumber: string;
}
