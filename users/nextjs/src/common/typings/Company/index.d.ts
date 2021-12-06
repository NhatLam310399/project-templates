import { IMongoObjectId } from "@common/typings";
import {
  IMongoObjectId,
  ICustomSizeImages,
  IUser,
  IProvince,
  IDistrict,
  IWard,
  IStreet,
  IMongoObjectId,
  IPointGeometry,
  IPointInput,
  IRecruitment,
  IUpload,
  ILocationTypeInput,
  ICustomSizeImagesInput,
  IWorkLocation,
  IWorkLocationInput,
  IBenefit,
  IBenefitType,
} from "@common/typings";
import { ICategoryLevel2 } from "../Category";

type ISortTypeCompany = "latest" | "mostView" | "mostSub" | "mostApplied";

export interface ICompany {
  _id?: IMongoObjectId;
  name?: string;
  code?: string;
  highlight?: boolean;
  description?: string;
  defaultRecord?: boolean;
  career?: ICategoryLevel2[];
  size?: string;
  isHot?: boolean;
  isTop?: boolean;
  status?: boolean;
  view?: number;
  subscribe?: number;
  location?: string;
  province?: IProvince[];
  user?: IUser;
  contactName?: string;
  phoneNumber?: string;
  benefits?: IBenefitType[];
  images?: ICustomSizeImages[];
  logo?: ICustomSizeImages;
  videos?: string;
  point?: number;
  slug?: string;
  keywords?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface ICompanyInput {
  name?: string;
  code?: string;
  highlight?: boolean;
  description?: string;
  defaultRecord?: boolean;
  career?: string[];
  size?: string;
  isHot?: boolean;
  isTop?: boolean;
  status?: boolean;
  view?: number;
  subscribe?: number;
  location?: string;
  user?: string;
  contactName?: string;
  phoneNumber?: string;
  benefits?: IBenefitTypeInput[];
  images?: ICustomUploadInput[];
  logo?: IUpload;
  videos?: string;
  point?: number;
  workLocation?: IWorkLocationInput[];
  customSizeForUploadImage?: ICustomSizeImagesInput;
  customSizeForUploadLogo?: ICustomSizeImagesInput;
}

export interface IBenefitTypeInput {
  icon: string;
  content: string;
}

export interface IFilterCompany {
  name?: string;
  highlight?: boolean;
  slug?: string;
  status?: boolean;
  isTop?: boolean;
  career?: string;
  sortType?: ISortTypeCompany;
  isRecruiting?: boolean;
  slugProvince?: string;
}

export interface ICreateCompany {
  companyCreateInput: ICompanyInput;
}
export interface IUpdateCompany {
  id: string;
  companyUpdateInput: ICompanyInput;
}
export interface IGetCompanies {
  keyword?: string;
  filterCompany?: IFilterCompany;
  page?: number;
  size?: number;
}
export interface IGetCompany {
  id: IMongoObjectId;
}

export interface IGetAllCompany {
  keyword?: string;
  filterCompany?: IFilterCompany;
  page?: Int;
  size?: Int;
}

export interface ISetSubscribeCompany {
  userId?: string;
  companyId?: string;
}

export interface ISetSeenCompany {
  userId?: string;
  companyId?: string;
}
