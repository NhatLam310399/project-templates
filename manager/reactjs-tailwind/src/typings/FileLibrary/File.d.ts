import { IMongoObjectId, ICustomSizeImages } from "typings";
export interface IFile {
  _id?: IMongoObjectId;
  name?: string;
  fileId?: string;
  size?: string;
  resolution?: string;
  type?: string;
  createAt?: Date;
  image?: ICustomSizeImages;
  url?: string;
}
