import { IMongoObjectId } from "@common/typings";

export interface IStatisticOverview {
  _id?: string;
  total_employer?: number;
  total_job_seeker?: number;
  total_point?: number;
  total_accumulated?: number;
  closing_date?: string;
}
