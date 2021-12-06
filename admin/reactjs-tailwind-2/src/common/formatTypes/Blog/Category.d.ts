import { IMongoObjectId } from "common/formatTypes";

export interface ICategory {
    _id?: IMongoObjectId;
    name?: string;
    description?: string;
    keywords?: string;
    createdAt?: Date;
}

export interface IFilterCategory {
    name?: string;
}

export interface IGetAllCategory {
    filterCategory: IFilterCategory;
    page?: number;
    size?: number;
}

export interface ICategoryInput {
    name: string;
    description?: string;
}

export interface ICreateCategory {
    categoryInput: ICategoryInput;
}

export interface IUpdateCategory {
    id: string;
    categoryInput: ICategoryInput;
}
