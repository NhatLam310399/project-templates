import { IUser, IMongoObjectId } from "@common/typings";

export interface IEvaluateDetail {
  name?: string;
  point?: number;
}

export interface IEvaluate {
  _id?: IMongoObjectId;
  user?: IUser;
  evaluator?: IUser;
  answer1?: IEvaluateDetail;
  answer2?: IEvaluateDetail;
  answer3?: IEvaluateDetail;
  answer4?: IEvaluateDetail;
  answer5?: IEvaluateDetail;
  answer6?: IEvaluateDetail;
  answer7?: IEvaluateDetail;
  answer8?: IEvaluateDetail;
  answer9?: IEvaluateDetail;
  answer10?: IEvaluateDetail;
  avgPoint?: number;
}

export interface IAnswer {
  answer?: IEvaluateDetail;
}
export interface IGetEvaluateByUserId {
  userId: string;
}
