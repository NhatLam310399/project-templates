import { IMongoObjectId } from "@common/typings";

export interface IStatisticJobSeeker {
  _id?: string;
  full_name?: string;
  phone_number?: string;
  province?: string;
  job?: string;
  job_viewed?: number;
  job_applied?: number;
}
