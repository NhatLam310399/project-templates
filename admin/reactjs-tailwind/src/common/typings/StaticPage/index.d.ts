import {
  IMongoObjectId,
  ICategory,
  ICustomSizeImages,
  ICustomSizeImagesInput,
  IUpload,
  IUser,
} from "common/typings";

export interface IStaticPage {
  _id?: IMongoObjectId;
  name?: string;
  content?: string;
  url?: string;
  category?: ICategory;
  description?: string;
  slug?: string;
  createdAt?: Date;
  title?: string;
  user?: IUser;
  image?: ICustomSizeImages;
}
export interface IUpdateStaticPages {
  fieldsToUpdate: IUpdatePagesInput;
  id: string;
}
export interface ICreateStaticPage {
  createPagesInput?: ICreatePagesInput;
}

export interface ICreatePagesInput {
  title: string;
  category?: string;
  url?: string;
  description?: string;
  content?: string;
  image?: IUpload | null;
  customImageSizeUpload?: ICustomSizeImagesInput;
}

export interface IUpdatePagesInput {
  title?: string;
  category?: string;
  url?: string;
  description?: string;
  content?: string;
  image?: IUpload | null;
  customImageSizeUpload?: ICustomSizeImagesInput;
}
export interface IRemoveStaticPages {
  id: IMongoObjectId;
}
