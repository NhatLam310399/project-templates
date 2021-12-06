import { IMongoObjectId, IUser } from "common/formatTypes";

export interface IRating {
    _id: IMongoObjectId;
    user?: IUser;
    rate?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IFilterRating {
    userPermission?: string;
    userName?: string;
}

export interface IGetAllRating {
    filterRating?: IFilterRating;
    page?: number;
    size?: number;
}

export interface IRatingInput {
    user?: string;
    rate?: string;
    point?: number;
}

export interface IRatingCreateInput {
    ratingCreateInput: IRatingInput;
}

export interface IRatingUpdateInput {
    id: IMongoObjectId;
    ratingUpdateInput: IRatingInput;
}

export interface IRatingDelete {
    id: string;
}
