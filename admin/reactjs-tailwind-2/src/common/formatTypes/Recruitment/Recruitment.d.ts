/* eslint-disable no-shadow */
import {
    IMongoObjectId,
    ICompany,
    IUser,
    IProvince,
    IDistrict,
    IWard,
    IStreet,
    IBenefit,
    ILocationTypeInput,
    ICategoryLv2,
} from "common/formatTypes";

enum IRecruitmentSortType {
    latest = "latest",
    oldest = "oldest",
    highSalary = "highSalary",
    lowSalary = "lowSalary",
}

export interface IRecruitment {
    _id?: IMongoObjectId;
    name?: string;
    type?: string;
    position?: string;
    number?: number;
    view?: number;
    description?: string;
    requirement?: string;
    benefits?: IBenefit[];
    province?: IProvince;
    ward?: IWard;
    career?: ICategoryLv2[];
    district?: IDistrict;
    street?: IStreet;
    highlight?: boolean;
    user?: string;
    appliedUser?: IUser[];
    company?: ICompany;
    salary?: number;
    showSalary?: boolean;
    language?: string;
    email?: string;
    isApproved?: boolean;
    slug?: string;
    keywords?: IKeyword[];
    expiredDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ISetSeenRecruitment {
    userId: string;
    recruitmentId: string;
}

export interface ISetAppliedRecruitment {
    userId: string;
    recruitmentId: string;
}

export interface ISetSavedRecruitment {
    userId: string;
    recruitmentId: string;
}

export interface IFilterRecruitment {
    name?: string;
    keywords?: string;
    slugProvince?: string;
    userCode?: string;
    slugCareer?: string;
    slugLevel?: string;
    slugLevelPrice?: string;
    highlight?: boolean;
    isApproved?: boolean;
    slugType?: string;
    sortType?: IRecruitmentSortType;
    companyCode?: string;
    companyName?: string;
    companySlug?: string;
    isExpired?: boolean;
    userId?: string;
    candidateId?: string;
}

export interface IGetAllRecruitment {
    filterRecruitment?: IFilterRecruitment;
    page?: number;
    size?: number;
}

export interface IGetRecruitmentByCompany {
    companyId: string;
}

export interface IGetRecruitmentByUser {
    companyId: string;
}
export interface IRecruitmentInput {
    _id?: string;
    name?: string;
    type?: string;
    position?: string;
    number?: number;
    description?: string;
    requirement?: string;
    benefits?: IBenefit[];
    highlight?: boolean;
    user?: string;
    appliedUser?: IUser[];
    company?: string;
    salary?: number;
    showSalary?: boolean;
    language?: string;
    careers?: ICategoryLv2[];
    email?: string;
    keywords?: IKeyword[];
    expiredDate?: Date | undefined | null;
    createdAt?: Date;
    updatedAt?: Date;
    isApproved?: boolean;
    locationTypeInput?: ILocationTypeInput;
}

export interface ICrateRecruitmentInput {
    recruitmentCreateInput: IRecruitmentInput;
}
export interface IUpdateRecruitment {
    id: IMongoObjectId;
    recruitmentUpdateInput: IRecruitmentInput;
}
export interface IDeleteRecruitment {
    id: IMongoObjectId;
}
export interface IKeyword {
    _id?: IMongoObjectId;
    name?: string;
    description?: string;
    keywords?: string;
    isHot?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
