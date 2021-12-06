import { IMongoObjectId } from "common/formatTypes";

export interface IJobLevel {
    _id?: IMongoObjectId;
    name?: string;
    description?: string;
    slug?: string;
    keywords?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IJobLevelInput {
    name?: string;
    description?: string;
}

export interface IUpdateJobLevel {
    id: string;
    jobLevelInput: IJobLevelInput;
}

export interface ICreateJobLevel {
    jobLevelInput: IJobLevelInput;
}

export interface IDeleteJobLevel {
    id: string;
}
