import { IMongoObjectId, IPermissionType, IUser, IPlace } from "common/typings";

type IOptionType = "everyone" | "onePerson";
export interface INotification {
  _id?: IMongoObjectId;
  permission: IPermissionType;
  user?: IUser;
  place?: IPlace;
  content?: string;
  title?: string;
  slug?: string;
  keywords?: string;
  seen?: boolean;
  idBooking?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface INotificationInput {
  user?: string;
  option?: IOptionType;
  permission?: IPermissionType;
  place?: string;
  content?: string;
  title?: string;
  slug?: string;
  keywords?: string;
  seen?: boolean;
  idBooking?: string;
}

export interface IFilterNotification {
  content?: string;
  permission?: IPermissionType;
  user?: string;
}

export interface IGetAllNotification {
  filterNotification?: IFilterNotification;
  page?: number;
  size?: number;
}

export interface ICreateNotification {
  notificationCreateInput?: INotificationInput;
}

export interface IUpdateNotification {
  id: string;
  notificationUpdateInput: INotificationInput;
}
