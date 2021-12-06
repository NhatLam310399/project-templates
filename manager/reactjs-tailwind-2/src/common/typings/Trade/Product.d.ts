import {
  IMongoObjectId,
  IUser,
  IProvince,
  IDistrict,
  IWard,
  IUpload,
  ITypes,
  ILocationTypeInput,
  ICustomSizeImagesInput,
  ICustomSizeImages,
  ICompany,
} from "common/typings";

export interface IProduct {
  _id?: IMongoObjectId;
  image?: ICustomSizeImages[];
  highlight?: boolean;
  user?: IUser;
  company?: ICompany;
  video?: string;
  type?: ITypes;
  name: string;
  price?: number;
  description?: string;
  regulations?: string;
  province?: IProvince;
  district?: IDistrict;
  ward?: IWard;
  slug?: string;
  keywords?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProductCreateInput {
  name: string;
  price: number;
  image?: IUpload[];
  highlight?: boolean;
  user?: string;
  types?: string;
  description?: string;
  regulations?: string;
  locationTypeInput?: ILocationTypeInput;
  customSizeForUploadImage?: ICustomSizeImagesInput;
}

export interface IProductUpdateInput {
  name?: string;
  price?: number;
  image?: IUpload[];
  highlight?: boolean;
  user?: string;
  type?: string;
  description?: string;
  regulations?: string;
  locationTypeInput?: ILocationTypeInput;
  customSizeForUploadImage?: ICustomSizeImagesInput;
}

export interface IFilterProduct {
  name?: string;
  highlight?: boolean;
  slug?: string;
}

export interface ICreateProduct {
  productCreateInput: IProductCreateInput;
}

export interface IUpdateProduct {
  id: string;
  productUpdateInput: IProductUpdateInput;
}

export interface IGetAllProduct {
  filterProduct?: IFilterProduct;
  page?: number;
  size?: number;
}
