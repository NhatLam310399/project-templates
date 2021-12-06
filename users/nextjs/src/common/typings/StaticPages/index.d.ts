import {
  ITypes,
  IMongoObjectId,
  IUser,
  ICustomSizeImages,
} from "@common/typings";

export interface IStaticPage {
  _id?: IMongoObjectId;
  name?: string;
  type?: ITypes;
  content?: string;
  url?: string;
  slug?: string;
  createdAt?: Date;
  image: ICustomSizeImages;
}

export interface IFilterPages {
  name?: string;
  slug?: string;
  type?: string;
}

export interface IGetAllPages {
  filterPages?: IFilterPages;
  page?: number;
  size?: number;
}

export interface IAbout {
  _id?: IMongoObjectId;
  images?: ICustomSizeImages[];
  user?: IUser;
  aboutUs?: string;
  vision?: string;
  coreValues?: string;
  potentialCandidate?: string;
  contact?: string;
  createdAt?: Date;
  updateAt?: Date;
}

export interface IGetAboutById {
  page?: number;
  size?: number;
}
