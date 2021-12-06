import {
  IMongoObjectId,
  IPlace,
  ICustomSizeImages,
  IUpload,
  ICustomSizeImagesInput,
  ICustomUploadInput,
} from "common/typings";

export interface IDocumentType {
  _id?: IMongoObjectId;
  images?: ICustomSizeImages[];
  video?: string;
  place?: IPlace;
  name?: string;
  introduce?: string;
  price?: number;
  file?: string;
  fileName?: string;
  keywords?: string;
  slug?: string;
  type?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IDocumentInput {
  images?: IUpload[];
  video?: IUpload;
  place?: string;
  name?: string;
  introduce?: string;
  price?: number;
  file?: IUpload;
  type?: string;
  customSizeForUploadImage?: ICustomSizeImagesInput;
}
export interface IDocumentUpdateInput {
  images?: ICustomUploadInput[];
  video?: IUpload;
  place?: string;
  name?: string;
  introduce?: string;
  price?: number;
  file?: IUpload;
  type?: string;
  customSizeForUploadImage?: ICustomSizeImagesInput;
}
export interface ICreateDocument {
  documentCreateInput: IDocumentInput;
}
export interface IUpdateDocument {
  id: string;
  documentUpdateInput: IDocumentUpdateInput;
}

export interface IFilterDocument {
  name?: string;
  type?: string;
  idCompany?: string;
}
export interface IGetAllDocument {
  filterDocument?: IFilterDocument;
  page?: number;
  size?: number;
}
