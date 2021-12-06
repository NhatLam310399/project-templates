import {
    IMongoObjectId,
    ICustomSizeImages,
    IUpload,
    ICategoryLv1,
    ICustomSizeImagesInput,
} from "common/formatTypes";

export interface ICategoryLv2 {
    _id?: IMongoObjectId;
    icon?: ICustomSizeImages;
    name?: string;
    categoryLevel1?: ICategoryLv1;
    description?: string;
    keywords?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IGetCategoryLv2 {
    filterCategoryLevel2?: {
        name?: string;
        categoryLevel1?: string;
    };
    page?: number;
    size?: number;
}

export interface IDeleteCategoryLv2ById {
    id: string;
}

export interface ICategoryLevel2Input {
    icon?: IUpload;
    name?: string;
    categoryLevel1?: string;
    description?: string;
    customSizeForUploadImage?: ICustomSizeImagesInput;
}

export interface IUpdateCategoryLv2 {
    id: string;
    categoryLevel2Input: ICategoryLevel2Input;
}

export interface ICreateCategoryLv2 {
    categoryLevel2Input: ICategoryLevel2Input;
}
