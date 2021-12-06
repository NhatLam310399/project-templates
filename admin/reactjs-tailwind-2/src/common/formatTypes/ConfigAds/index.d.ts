import {
    IMongoObjectId,
    ICustomSizeImages,
    IUpload,
    ICustomSizeImagesInput,
    ITypes,
} from "common/formatTypes";

export interface IAds {
    _id?: IMongoObjectId;
    name?: string;
    code?: string;
    urlImage?: ICustomSizeImages;
    slideImg?: ICustomSizeImages[];
    displayLocation?: ITypes;
    createdAt?: Date;
    updatedAt?: Date;
    link?: string;
    language?: string;
}

export interface IFilterAds {
    codeOrImg?: boolean;
    isSlide?: boolean;
    displayLocation?: string;
    language?: string;
}

export interface IGetAdsAll {
    filterAds?: IFilterAds;
}

export interface IAdsInput {
    name?: string;
    code?: string;
    urlImage?: IUpload;
    link?: string;
    displayLocation?: string;
    language?: string;
    customSizeForUploadImage?: ICustomSizeImagesInput;
}

export interface ICreateAdsInput {
    createAdsInput?: IAdsInput;
}

export interface IUpdateAdsInput {
    fieldsToUpdate?: IAdsInput;
    id?: string;
}

export interface IDeleteAds {
    id: string;
}
