import { IMongoObjectId } from "common/formatTypes";

export interface IStatisticEmployer {
    _id?: string;
    full_name?: string;
    phone_number?: string;
    code?: string;
    score?: number;
    total_post?: number;
    assessor?: string;
}
