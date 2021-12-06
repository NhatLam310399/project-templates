import {
    IMongoObjectId,
    ICustomSizeImages,
    IUpload,
    ICustomSizeImagesInput,
} from "common/formatTypes";

export interface IBenefit {
    _id?: IMongoObjectId;
    icon?: ICustomSizeImages;
    name?: string;
    description?: string;
}

export interface IFilterBenefit {
    name?: string;
}

export interface IGetAllBenefit {
    filterBenefit?: IFilterBenefit;
    page?: number;
    size?: number;
}

export interface IBenefitInput {
    icon?: IUpload;
    name?: string;
    description?: string;
    customSizeForUploadImage?: ICustomSizeImagesInput;
}

export interface IUpdateBenefit {
    id: string;
    benefitInput: IBenefitInput;
}

export interface ICreateBenefit {
    benefitInput: IBenefitInput;
}

export interface IDeleteBenefit {
    id: string;
}

export interface IBenefitType {
    _id?: IMongoObjectId;
    icon?: IBenefit;
    content?: string;
}

export interface IBenefitTypeInput {
    icon?: string;
    content?: string;
}
