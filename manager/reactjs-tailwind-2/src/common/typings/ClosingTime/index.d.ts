import { IMongoObjectId, IRoom, IPlace } from "common/typings";

export interface IClosingTime {
  _id?: IMongoObjectId;
  karaoke?: IPlace;
  room?: IRoom[];
  dayOffStart?: Date;
  dayOffEnd?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IClosingTimeInput {
  karaoke?: string;
  room?: string[];
  dayOffStart?: Date;
  dayOffEnd?: Date;
}

export interface ICreateClosingTime {
  closingTimeCreateInput: IClosingTimeInput;
}

export interface IUpdateClosingTime {
  id: IMongoObjectId;
  closingTimeUpdateInput: IClosingTimeInput;
}
export interface IFilterClosingTime {
  karaokeId: string;
}

export interface IGetAllClosingTime {
  page?: number;
  size?: number;
  filterClosingTime?: IFilterClosingTime;
}
