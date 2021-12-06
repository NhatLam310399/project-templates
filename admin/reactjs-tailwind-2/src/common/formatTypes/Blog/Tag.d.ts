import { IMongoObjectId } from "common/formatTypes";

export interface ITag {
    _id?: IMongoObjectId;
    name?: string;
    isHot?: boolean;
    description?: string;
    keywords?: string;
    createdAt?: Date;
}

export interface IFilterTag {
    name?: string;
}

export interface IGetAllTag {
    filterTag: IFilterTag;
    page?: number;
    size?: number;
}

export interface ITagInput {
    name?: string;
    description?: string;
    isHot?: boolean;
}

export interface ICreateTag {
    tagInput: ITagInput;
}

export interface IUpdateTag {
    id: string;
    tagInput: ITagInput;
}

export interface IDeleteTag {
    id: IMongoObjectId;
}
