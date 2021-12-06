import { IMongoObjectId, IPlace, ICustomSizeImages } from "common/typings";

export interface IDocumentType {
  _id?: IMongoObjectId;
  images?: ICustomSizeImages;
  video?: string;
  place?: IPlace;
  name: string;
  introduce?: string;
  price?: number;
  file?: string;
  keywords?: string;
  slug?: string;
  type?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
