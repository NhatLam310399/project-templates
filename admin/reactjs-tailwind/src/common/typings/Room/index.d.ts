import {
  IMongoObjectId,
  ICustomSizeImages,
  IPlace,
  ISortType,
  ICustomUploadInput,
  ICustomUploadInputVideo,
  ICustomSizeImagesInput,
  IUpload,
} from "common/typings";

export interface IRoom {
  _id: IMongoObjectId;
  name: string;
  place: IPlace;
  description: string;
  price: number;
  pricePromotion: number;
  image: ICustomSizeImages[];
  video: string[];
  amount: number;
  slug: string;
  keywords: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRoomCreateInput {
  name?: string;
  place?: string;
  description?: string;
  pricePromotion?: number;
  image?: IUpload[];
  video?: IUpload[];
  price?: number;
  amount?: number;
  customSizeForUploadImage?: ICustomSizeImagesInput;
}

export interface IRoomUpdateInput {
  name?: string;
  place?: string;
  description?: string;
  price?: number;
  amount?: number;
  pricePromotion?: number;
  image?: ICustomUploadInput[];
  video?: ICustomUploadInputVideo[];
  customSizeForUploadImage?: ICustomSizeImagesInput;
}

export interface IFilterRoom {
  name?: string;
  amount?: number;
  priceMin?: number;
  priceMax?: number;
  sortType?: ISortType;
  slug?: string;
  status?: boolean;
}

export interface IGetAllRoom {
  filterRoom?: IFilterRoom;
  page?: number;
  size?: number;
}

export interface IUpdateRoomPlace {
  idPlace: string;
  idRoom: string;
}

export interface IUpdateRoomDelete {
  idPlace: string;
  idRoom: string;
}

export interface ICreateRoom {
  roomCreateInput: IRoomCreateInput;
}

export interface IUpdateRoom {
  id: string;
  roomUpdateInput: IRoomUpdateInput;
}

export type IRoomStatus = "playing" | "empty" | "booked" | "canceled";

export interface IGetRoomByEmptyCalendarStatus {
  status: IRoomStatus;
  oneDay: Date;
}
