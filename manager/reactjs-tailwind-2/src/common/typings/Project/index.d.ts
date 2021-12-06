import {
  IMongoObjectId,
  IPlace,
  ICustomSizeImages,
  ICustomSizeImagesInput,
  IUpload,
} from "common/typings";

export interface IProjectType {
  _id?: IMongoObjectId;
  name?: string;
  images?: ICustomSizeImages[];
  video?: string;
  introduce?: string;
  company?: IPlace;
  detail?: string;
  checkDownload?: boolean;
  slug?: string;
  keywords?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProjectInput {
  name?: string;
  images?: IUpload[];
  video?: IUpload;
  introduce?: string;
  company?: string;
  detail?: string;
  checkDownload?: boolean;
  slug?: string;
  keywords?: string;
  customSizeForUploadImage?: ICustomSizeImagesInput;
}

export interface IFilterProject {
  name?: string;
  company?: string;
}

export interface IGetAllProject {
  filterProject?: IFilterProject;
  page?: number;
  size?: number;
}

export interface ICreateProject {
  projectCreateInput: IProjectInput;
}

export interface IUpdateProject {
  id: string;
  projectUpdateInput: IProjectInput;
}
