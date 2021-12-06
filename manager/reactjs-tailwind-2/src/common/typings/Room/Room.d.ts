import {
  IMongoObjectId,
  IPlace,
  IRoomSortType,
  ICustomSizeImages,
  IRoomStatus,
  IUpload,
  ICustomSizeImagesInput,
  ICustomUploadInput,
  ICustomUploadInputVideo,
} from "common/typings";

export interface IRoom {
  _id?: IMongoObjectId;
  name?: string;
  place?: IPlace;
  description?: string;
  price?: number;
  pricePromotion?: number;
  image?: ICustomSizeImages[];
  video?: string[];
  amount?: number;
  slug?: string;
  status?: IRoomStatus;
  keywords?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IFilterRoom {
  name?: string;
  sizeRoom?: number;
  priceMin?: number;
  priceMax?: number;
  sortType?: IRoomSortType;
  slug?: string;
  status?: boolean;
}
export interface IGetRoomByKaraokeId {
  id?: string;
  filterRoom?: IFilterRoom;
  page?: number;
  size?: number;
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
  status?: string;
  customSizeForUploadImage?: ICustomSizeImagesInput;
}
export interface IRoomUpdateInput {
  name?: string;
  place?: string;
  description?: string;
  pricePromotion?: number;
  image?: ICustomUploadInput[];
  video?: ICustomUploadInputVideo[];
  price?: number;
  amount?: number;
  status?: string;
  customSizeForUploadImage?: ICustomSizeImagesInput;
}

export interface ICreateRoom {
  roomCreateInput: IRoomCreateInput;
}

export interface IUpdateRoom {
  id: string;
  roomUpdateInput: IRoomUpdateInput;
}
