import {
  IMongoObjectId,
  IPlace,
  ICustomSizeImages,
  ICustomSizeImagesInput,
  IUpload,
} from "common/typings";

export interface IBasicDocumentType {
  _id?: IMongoObjectId;
  images?: ICustomSizeImages;
  video?: string;
  karaoke?: IPlace;
  name: string;
  introduce?: string;
  price?: number;
  file?: string;
  fileName?: string;
  link?: string;
  highlight?: boolean;
  keywords?: string;
  slug?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBasicDocumentInput {
  images?: IUpload;
  video?: IUpload;
  karaoke?: string;
  name?: string;
  introduce?: string;
  price?: number;
  file?: IUpload;
  fileName?: string;
  link?: string;
  customSizeForUploadImage?: ICustomSizeImagesInput;
  highlight?: boolean;
  slug?: string;
  keywords?: string;
}

export interface IFilterBasicDocument {
  name?: string;
  highlight?: boolean;
  idCompany?: string;
}

export interface IGetAllBasicDocument {
  filterBasicDocument?: IFilterBasicDocument;
  page?: number;
  size?: number;
}

export interface ICreateBasicDocument {
  basicDocumentCreateInput: IBasicDocumentInput;
}

export interface IUpdateBasicDocument {
  id: string;
  basicDocumentUpdateInput: IBasicDocumentInput;
}
