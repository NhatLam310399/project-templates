import {
    ICustomSizeImages,
    IUser,
    IProvince,
    IDistrict,
    IWard,
    ISortType,
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
    IBenefitType,
    IBenefitTypeInput,
    ICategoryLv2,
    ICustomUploadInput,
} from "common/formatTypes";
import { ICareerCounseling } from "../Blog";
import { ICareer } from "../Career";

enum CompanySortType {
    latest,
    mostView,
    mostSub,
}

export interface ICompany {
    _id?: IMongoObjectId;
    name?: string;
    code?: string;
    highlight?: boolean;
    description?: string;
    defaultRecord?: boolean;
    career?: ICategoryLv2[];
    size?: string;
    isHot?: boolean;
    isTop?: boolean;
    isIdentified?: boolean;
    status?: boolean;
    view?: number;
    subscribe?: number;
    province?: IProvince;
    district?: IDistrict;
    ward?: IWard;
    street?: IStreet;
    user?: IUser;
    contactName?: string;
    email?: string;
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
    career?: string[];
    defaultRecord?: boolean;
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
    images?: IUpload[];
    isIdentified?: boolean;
    logo?: IUpload;
    videos?: string;
    point?: number;
    customSizeForUploadImage?: ICustomSizeImagesInput;
    customSizeForUploadLogo?: ICustomSizeImagesInput;
}
export interface IUpdateCompanyInput {
    name?: string;
    code?: string;
    highlight?: boolean;
    description?: string;
    career?: string[];
    defaultRecord?: boolean;
    size?: string;
    isHot?: boolean;
    isTop?: boolean;
    status?: boolean;
    view?: number;
    subscribe?: number;
    isIdentified?: boolean;
    location?: string;
    user?: string;
    contactName?: string;
    phoneNumber?: string;
    benefits?: IBenefitTypeInput[];
    images?: ICustomUploadInput[];
    logo?: ICustomUploadInput;
    videos?: string;
    point?: number;
    customSizeForUploadImage?: ICustomSizeImagesInput;
    customSizeForUploadLogo?: ICustomSizeImagesInput;
}
export interface IFilterCompany {
    name?: string;
    highlight?: boolean;
    slug?: string;
    status?: boolean;
    isTop?: boolean;
    sortType?: CompanySortType;
}
export interface ICreateCompany {
    companyCreateInput: ICompanyInput;
}
export interface IUpdateCompany {
    id: string;
    companyUpdateInput: IUpdateCompanyInput;
}
export interface IDeleteCompany {
    id: string;
}
export interface IGetCompanies {
    filterCompany?: IFilterCompany;
    page?: number;
    size?: number;
}
