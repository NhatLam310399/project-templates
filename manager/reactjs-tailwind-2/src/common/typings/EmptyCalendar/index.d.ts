import { IMongoObjectId, IRoom, IRoomStatus } from "common/typings";
export interface IEmptyCalendar {
  _id?: IMongoObjectId;
  room?: IRoom;
  timeStart?: Date;
  timeEnd?: Date;
  price?: number;
  status?: IRoomStatus;
  language?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
