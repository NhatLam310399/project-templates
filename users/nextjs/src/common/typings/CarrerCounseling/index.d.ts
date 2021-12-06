import {
  IMongoObjectId,
  ICustomSizeImages,
  ICategory,
  ITag,
} from "@common/typings";

export interface ICarrerCounseling {
  _id?: IMongoObjectId;
  name?: string;
  description?: string;
  content?: string;
  urlImage?: ICustomSizeImages;
  videos?: string[];
  code?: string;
  highlight?: boolean;
  enabled?: boolean;
  category?: ICategory;
  tags?: ITag[];
  slug?: string;
  keywords?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IGetCarrerCounseling {
  filterCarrerCounseling: {
    name?: string;
    code?: string;
    highlight?: boolean;
    category?: string;
    tags?: string;
    target?: TargetType;
  };
  page?: number;
  size?: number;
}

export type TargetType = "CANDIDATE" | "EMPLOYER";
