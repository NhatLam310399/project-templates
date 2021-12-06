import { IMongoObjectId } from "common/formatTypes";

export interface INews {
    _id?: IMongoObjectId;
    name?: string;
    type?: string;
    author?: string;
    date?: string;
}

export interface INewsInput {
    name?: string;
    type?: string;
    author?: string;
    date?: string;
}
