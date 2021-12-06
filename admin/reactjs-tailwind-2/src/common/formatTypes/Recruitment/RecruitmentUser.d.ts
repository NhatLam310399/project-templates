import { IMongoObjectId } from "common/formatTypes";

export interface IGetRecruitmentAppliedUser {
    id?: IMongoObjectId;
    page?: number;
    size?: number;
}
export interface IGetRecruitmentViewedUser {
    id?: IMongoObjectId;
    page?: number;
    size?: number;
}
