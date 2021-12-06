import { IMongoObjectId, IUser, IEvaluate } from "@common/typings";

export interface IFilterRequestReview {
  candidate?: string;
  nameOrCode?: string;
  employer?: string;
  status?: RequestReviewStatus;
}

export interface IRequestReview {
  _id?: IMongoObjectId;
  candidate?: IUser;
  employer?: IUser;
  status?: RequestReviewStatus;
  evaluate?: IEvaluate;
}

export interface IGetAllRequestReview {
  filterRequestReview?: IFilterRequestReview;
  page?: number;
  size?: number;
}

export type RequestReviewStatus = "waiting_for_review" | "reviewed";

export interface ICreateRequestReviewInput {
  createRequestReviewInput: {
    candidate?: string;
    employer?: string;
    status?: RequestReviewStatus;
    evaluate?: string;
  };
}
