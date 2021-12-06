import {
    IMongoObjectId,
    ICustomSizeImages,
    ICategory,
    IUpload,
    ITag,
    ICustomSizeImagesInput,
} from "common/formatTypes";

export interface ICareerCounseling {
    _id?: IMongoObjectId;
    name: string;
    description?: string;
    content?: string;
    urlImage?: ICustomSizeImages;
    code?: string;
    highlight?: boolean;
    enabled?: boolean;
    language?: string;
    category?: ICategory;
    tags?: ITag[];
    slug?: string;
    keywords?: string;
    createdAt?: Date;
    updatedAt?: Date;
    title?: string;
}

export interface ICareerCounselingInput {
    title?: string;
    name?: string;
    description?: string;
    content?: string;
    urlImage?: IUpload;
    videos?: IUpload[];
    code?: string;
    highlight?: boolean;
    enabled?: boolean;
    language?: string;
    category?: string;
    tags?: string[];
    slug?: string;
    keywords?: string;
    customSizeForUploadImage?: ICustomSizeImagesInput;
}

export interface ICreateCareerCounseling {
    careerCounselingInput: ICareerCounselingInput;
}

export interface IUpdateCareerCounseling {
    id: string;
    careerCounselingInput: ICareerCounselingInput;
}

type IFilterCareerCounseling = {
    name?: string;
    code?: string;
    highlight?: boolean;
    category?: string;
    tags?: string;
};

export interface IGetCareerCounseling {
    filterCareerCounseling?: IFilterCareerCounseling;
    page?: number;
    size?: number;
}
