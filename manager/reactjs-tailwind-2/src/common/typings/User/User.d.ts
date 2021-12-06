import {
  IMongoObjectId,
  ICustomSizeImages,
  IProvince,
  IDistrict,
  IWard,
  ILocationTypeInput,
  ICustomSizeImagesInput,
  IUpload,
  ICoupon,
  IPlace,
  IDocumentType,
} from "common/typings";

export type IPermissionType = "USER" | "CARE_STAFF" | "BOSS" | "MANAGER";
export interface IUser {
  _id?: IMongoObjectId;
  language?: string;
  highlight?: boolean;
  lastSeenAt?: Date;
  deviceToken?: string;
  rate?: number;
  clientId?: string;
  provider?: string;
  birthday?: Date;
  gender?: string;
  urlAvt?: ICustomSizeImages;
  identifyCard?: string;
  displayName?: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
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
  coupon?: ICoupon[];
  slug?: string;
  keywords?: string;
  favouriteKaraoke?: IPlace[];
  point?: number;
  createdAt?: Date;
  updatedAt?: Date;
  documents?: IDocumentType[];
}
export interface IGetUserByID {
  id: IMongoObjectId;
}

export interface IUserInput {
  highlight?: boolean;
  username?: string;
  phoneNumber?: string;
  lastSeenAt?: Date;
  rate?: number;
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
  isHot?: boolean;
  tradingAddress?: string;
  gender?: string;
  customSizeForUploadImage?: ICustomSizeImagesInput;
  permission?: string;
}
export interface IUpdateUserProfileInput {
  updateUserInput?: IUserInput;
}
export interface IGetIdByPhoneNumber {
  phoneNumber: string;
}
export interface ICheckEmailExistByAdmin {
  email: string;
}
