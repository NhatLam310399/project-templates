import { IMongoObjectId, ICustomSizeImages, ITypes } from "@common/typings";

export interface IAds {
  _id?: IMongoObjectId;
  name?: string;
  code?: string;
  urlImage?: ICustomSizeImages;
  slideImg?: ICustomSizeImages[];
  displayLocation?: ITypes;
  createdAt?: Date;
  updatedAt?: Date;
  link?: string;
  language?: string;
}

export interface IGetAdsAll {
  filterAds: {
    codeOrImg?: boolean;
    isSlide?: boolean;
    displayLocation?: string;
    language?: string;
  };
}

export interface IGetAdsByLocation {
  displayLocation: IMongoObjectId;
  codeOrImg?: boolean;
  isSlide?: boolean;
}
