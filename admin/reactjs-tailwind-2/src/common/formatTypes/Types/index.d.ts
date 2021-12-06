import { IMongoObjectId } from "common/formatTypes";
import { ReactNode } from "react";

export interface ITypes {
    _id?: IMongoObjectId;
    name?: string;
    code?: string;
    value?: string;
    slug?: string;
    language?: string;
}
export interface IGetTypesByCode {
    code: string;
    language?: string;
}
