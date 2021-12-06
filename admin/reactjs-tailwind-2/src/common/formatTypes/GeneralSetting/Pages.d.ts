import {
    IMongoObjectId,
    ITypes,
    ICustomSizeImages,
    ICustomSizeImagesInput,
    IUpload,
    IUser,
} from "common/formatTypes";

export interface IPages {
    _id?: IMongoObjectId;
    name?: string;
    content?: string;
    url?: string;
    type?: ITypes;
    description?: string;
    slug?: string;
    createdAt?: Date;
    user?: IUser;
    image?: ICustomSizeImages;
}

export interface IPageInput {
    name?: string;
    type?: string;
    url?: string;
    content?: string;
    image?: IUpload | null;
    customImageSizeUpload?: ICustomSizeImagesInput;
}

export interface ICreatePagesInput {
    createPagesInput?: IPageInput;
}

export interface IUpdatePagesInput {
    fieldsToUpdate?: IPageInput;
    id: string;
}
export interface IRemoveStaticPages {
    id: IMongoObjectId;
}

export interface IFilterPages {
    name?: string;
    slug?: string;
    type?: string;
}

export interface IGetAllPages {
    filterPages?: IFilterPages;
    page?: number;
    size?: number;
}
