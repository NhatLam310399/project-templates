import {
    IMongoObjectId,
    ICustomSizeImages,
    ITypes,
    ICustomSizeImagesInput,
    ICustomUploadInput,
    IUpload,
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
}

export interface IFilterAds {
    codeOrImg?: boolean;
    isSlide?: boolean;
    displayLocation?: string;
}

export interface IAdsInput {
    name?: string;
    code?: string;
    urlImage?: IUpload;
    slideImg?: ICustomUploadInput[];
    link?: string;
    displayLocation?: IMongoObjectId;
    customSizeForUploadImage?: ICustomSizeImagesInput;
}

export interface ICreateAds {
    createAdsInput: IAdsInput;
}

export interface IUpdateAds {
    fieldsToUpdate: IAdsInput;
    id: string | null;
}

export interface IGetAdsAll {
    filterAds?: IFilterAds;
}

export interface IGetAdsAllByLocation {
    displayLocation: IMongoObjectId;
}
