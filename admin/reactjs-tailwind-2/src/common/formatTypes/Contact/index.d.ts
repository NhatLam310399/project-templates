import { IMongoObjectId } from "common/formatTypes";

export interface IContact {
    _id?: IMongoObjectId;
    name?: string;
    title?: string;
    description?: string;
    email?: string;
    keywords?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface IDeleteContact {
    id: string;
}
