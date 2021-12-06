import { IMongoObjectId } from "common/formatTypes";
export interface IKeyword {
    _id?: IMongoObjectId;
    name?: string;
    description?: string;
    keywords?: string;
    isHot?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface IGetAllKeyword {
    filterKeyword?: {
        name?: string;
    };
    page?: number;
    size?: number;
}
export interface IKeywordInput {
    name?: string;
    description?: string;
    isHot?: boolean;
}
export interface ICreateKeyword {
    keywordInput: IKeywordInput;
}
export interface IUpdateKeyword {
    id: string;
    keywordInput: IKeywordInput;
}
export interface IDeleteKeyword {
    id: string;
}
