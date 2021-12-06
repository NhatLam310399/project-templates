import {
  IMongoObjectId,
  IUser,
  ICustomSizeImages,
  IUpload,
  ICustomSizeImagesInput,
  ICustomUploadInput,
  IPlace,
} from "common/typings";

export interface ICareStaff {
  _id?: IMongoObjectId;
  staff?: IUser;
  user?: IUser;
  company?: IPlace;
  comment?: string;
  enabled?: boolean;
  image?: ICustomSizeImages[];
  rate?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICareStaffCreateInput {
  staff?: string;
  user?: string;
  comment?: string;
  enabled?: boolean;
  image?: IUpload[];
  rate?: number;
  customSizeForUploadImage?: ICustomSizeImagesInput;
}

export interface ICareStaffUpdateInput {
  staff?: string;
  user?: string;
  comment?: string;
  enabled?: boolean;
  image?: ICustomUploadInput[];
  rate?: number;
  customSizeForUploadImage?: ICustomSizeImagesInput;
}

export interface IFilterCareStaff {
  rate?: number;
  enabled?: boolean;
  staff?: string;
  user?: string;
}

export interface IGetAllCareStaff {
  filterCareStaff?: IFilterCareStaff;
  page: number;
  size: number;
}

export interface ICreateCareStaff {
  careStaffCreateInput: ICareStaffCreateInput;
}

export interface IUpdateCareStaff {
  id: string;
  careStaffUpdateInput: ICareStaffUpdateInput;
}
