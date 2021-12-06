import {
  IMongoObjectId,
  IUser,
  ITypes,
  ICustomSizeImages,
  ICustomSizeImagesInput,
  IUpload,
  ICompany,
} from "@common/typings";
export interface INotification {
  _id?: IMongoObjectId;
  name?: string;
  company?: ICompany;
  date?: Date;
  description?: string;
  link?: string;
  slug?: string;
  keywords?: string;
  seen?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IGetNotificationByUser {
  userId: string;
}
export interface ISetSeenForNotify {
  userId: string;
}

export interface INotificationSetting {
  _id?: IMongoObjectId;
  name?: string;
  description?: string;
  permission?: string;
  keywords?: string;
  createdAt?: Date;
}

export interface IGetNotificationSetting {
  filterNotifySetting: {
    permission: string;
  };
}
