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
    ICompany,
    IRecruitment,
    IPermissionType,
} from "common/formatTypes";

type IGender = {
    name: string;
};
export type IStatus = "applied" | "approved";
export type IViewStatus = "applied" | "approved" | "viewed";
export interface IUser {
    _id?: IMongoObjectId;
    clientId?: string;
    provider?: string;
    birthday?: Date;
    gender?: string;
    urlAvt?: ICustomSizeImages;
    firstName?: string;
    lastName?: string;
    displayName?: string;
    company?: ICompany;
    username?: string;
    email?: string;
    password?: string;
    phoneNumber?: string;
    permission?: IPermissionType;
    province?: IProvince;
    district?: IDistrict;
    ward?: IWard;
    street?: IStreet;
    identityCard?: string;
    isHot?: boolean;
    rating?: number;
    point?: number;
    subscribedCompany?: ICompany[];
    seenCompany?: ICompany[];
    seenRecruitment?: IRecruitment[];
    appliedRecruitment?: IRecruitment[];
    savedRecruitment?: IRecruitment[];
    slug?: string;
    keywords?: string;
    language?: string;
    enabled?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    code?: string;
}
export interface IUserResults {
    results?: IUser[];
    totalCount?: number;
}
export interface IUserStatus extends IUser {
    status?: string;
}
export interface IFilterUser {
    displayName?: string;
    phoneNumber?: string;
    isHot?: boolean;
    permission?: string;
    email?: string;
    slugCareer?: string;
}
export interface IGetAllUserHasPermissions {
    permissions: IPermissionType[];
    page?: number;
    size?: number;
    filterUser?: IFilterUser;
}
export interface IGetAllUser {
    filterUser?: IFilterUser;
    page?: number;
    size?: number;
}
export interface IUserInput {
    phoneNumber?: string;
    email?: string;
    password?: string;
    displayName?: string;
    permission?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    urlAvt?: IUpload;
    birthday?: Date | null;
    locationTypeInput?: ILocationTypeInput;
    gender?: string;
    point?: number;
    isHot?: boolean;
    customSizeForUploadImage?: ICustomSizeImagesInput;
    permission?: IPermissionType;
    enabled?: boolean;
    identityCard?: string;
}

export interface ICreateUserInput {
    createUserInput?: IUserInput;
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

export interface ISetPermissionForUser {
    id: string;
    permission: string;
}
export interface ISetEnableForUser {
    id: string;
    enabled: boolean;
}

export interface IUserType {
    name: string;
    value: IPermissionType;
}
export interface IUpdateUserProfile {
    updateUserInput: IUserInput;
}

export interface IGetUserByRecruitment {
    idRecruitment: string;
    page?: number;
    size?: number;
}
