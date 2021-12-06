import { IMongoObjectId, IFile } from "typings";
export interface IFolder {
  _id?: IMongoObjectId;
  name?: string;
  icon?: string;
  totals?: number;
  files?: IFile[];
  children?: IFolder[];
}

export interface IFolderInput {
  name?: string;
  icon?: string;
}
export interface ICreateFolder {
  createFolder: IFolderInput;
}
export interface IUpdateFolder {
  _id: string;
  updateFolder: IFolderInput;
}
