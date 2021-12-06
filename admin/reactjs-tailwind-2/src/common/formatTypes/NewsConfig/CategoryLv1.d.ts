import { IMongoObjectId } from "common/formatTypes";

export interface ICategoryLevel1 {
    _id?: IMongoObjectId;
    name?: string;
    description?: string;
    keywords?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IFilterCategoryLevel1 {
    name?: string;
}

export interface IGetAllCategoryLevel1 {
    filterCategoryLevel1?: IFilterCategoryLevel1;
    page?: number;
    size?: number;
}

export interface ICategoryLevel1Input {
    name?: string;
    description?: string;
}

export interface ICreateCategoryLevel1Input {
    categoryLevel1Input: ICategoryLevel1Input;
}

export interface IUpdateCategoryLevel1Input {
    id: IMongoObjectId | null;
    categoryLevel1Input: ICategoryLevel1Input;
}

export interface IDeleteCategoryLevel1 {
    id: IMongoObjectId;
}
