import {
  IMongoObjectId,
  IProvince,
  IDistrict,
  IWard,
  IStreet,
  IUpload,
  ICustomSizeImagesInput,
  ICompany,
  IRecruitment,
  IPermission,
  ICustomSizeImages,
  ILocationTypeInput,
} from "@common/typings";

export type IGenderType = "male" | "female";

export interface IUser {
  _id?: IMongoObjectId;
  clientId?: string;
  provider?: string;
  birthday?: Date;
  gender?: IGenderType;
  urlAvt?: ICustomSizeImages;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  company?: ICompany;
  username?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  permission?: IPermission;
  identityCard?: string;
  code?: string;
  title?: string;
  history?: string;
  province?: IProvince;
  district?: IDistrict;
  ward?: IWard;
  street?: IStreet;
  isVerified?: boolean;
  isHot?: boolean;
  point?: number;
  postedJob?: number;
  subscribedCompany?: ICompany[];
  seenCompany?: ICompany[];
  seenRecruitment?: IRecruitment[];
  appliedRecruitment?: IAppliedRecruitment[];
  savedRecruitment?: IRecruitment[];
  slug?: string;
  keywords?: string;
  language?: string;
  enabled?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IUserResults {
  results?: IUser[];
  totalCount?: number;
}
export interface IFilterUser {
  username?: string;
  phoneNumber?: string;
  isHot?: boolean;
  permission?: string;
}
export interface IGetAllUserHasPermissions {
  permissions: IPermission[];
  page?: number;
  size?: number;
  filterUser?: IFilterUser;
}
export interface IGetAllUser {
  filterUser: IFilterUser;
  page?: number;
  size?: number;
}
export interface IUserInput {
  username?: string;
  phoneNumber: string;
  email: string;
  password: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  permission?: string;
  identityCard?: string;
  title?: string;
  company?: string;
  urlAvt?: IUpload;
  birthday?: Date | null;
  locationTypeInput?: ILocationTypeInput;
  gender?: IGenderType;
  point?: number;
  isVerified?: boolean;
  isHot?: boolean;
  keywords?: string;
  enabled?: boolean;
  customSizeForUploadImage?: ICustomSizeImagesInput;
}

export interface IUpdateUser extends IUserInput {
  companyName?: string;
  password?: string;
  phoneNumber?: string;
  email?: string;
  history?: string;
  rating?: number;
  language?: string;
}

export interface ICreateUserInput {
  createUserInput?: IUserInput;
}

export interface IUpdateUserInput {
  updateUserInput: IUpdateUser;
}

export interface IDeleteUser {
  id: IMongoObjectId;
}

export interface IGetUser {
  id: IMongoObjectId;
}

export interface IResetPasswordInput {
  username: string;
  newPassword: string;
}
export interface IAppliedRecruitment {
  recruitment?: IRecruitment;
  date?: Date;
}
