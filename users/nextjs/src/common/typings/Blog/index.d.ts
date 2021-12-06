import { IMongoObjectId, ICustomSizeImages } from "@common/typings";

export interface IBlog {
  _id?: MongoObjectId;
  name?: string;
  description?: string;
  content?: string;
  urlImage?: ICustomSizeImages;
  videos?: [string];
  code?: string;
  highlight?: Boolean;
  enabled?: Boolean;
  language?: string;
  category?: Category;
  tags?: [Tag];
  slug?: string;
  keywords?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IFilterBlog {
  name?: string;
  code?: string;
  highlight?: Boolean;
  category?: string;
  tags?: string;
  target?: TargetType;
}

export interface IGetAllBlog {
  filterCareerCounseling?: IFilterBlog;
  page?: Int;
  size?: Int;
}

export interface IGetBlogById {
  id: string | string[];
}

export interface IGetBlogBySlug {
  slug: string;
}

export type TargetType = "CANDIDATE" | "EMPLOYER";
