import { IMongoObjectId } from "common/formatTypes";

export interface IJobType {
    _id?: IMongoObjectId;
    name?: string;
    description?: string;
    keywords?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IFilterJobType {
    name?: string;
}

export interface IGetAllJobType {
    filterJobType?: IFilterJobType;
    page?: number;
    size?: number;
}

export interface IJobTypeInput {
    name?: string;
    description?: string;
}

export interface IUpdateJobType {
    id: string;
    jobTypeInput: IJobTypeInput;
}

export interface ICreateJobType {
    jobTypeInput: IJobTypeInput;
}

export interface IDeleteJobType {
    id: string;
}
