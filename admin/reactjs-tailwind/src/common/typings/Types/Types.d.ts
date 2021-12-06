import {
  IMongoObjectId,
  ICustomSizeImages,
  ICustomSizeImagesInput,
  IUpload,
} from "common/typings";

export interface ITypes {
  _id?: IMongoObjectId;
  name?: string;
  image?: ICustomSizeImages;
  code?: string;
  value?: string;
  slug?: string;
  language?: string;
}

export interface ITypesInput {
  name?: string;
  code?: string;
  value?: string;
  slug?: string;
  language?: string;
  image?: IUpload;
  customSizeForUploadImage?: ICustomSizeImagesInput;
}

export interface IGetTypesByCode {
  code?: string;
  page?: number;
  size?: number;
  name?: string;
}

export interface ICreateTypes {
  createTypesInput: ITypesInput;
}

export interface IUpdateTypes {
  id: string;
  fieldsToUpdate: ITypesInput;
}
