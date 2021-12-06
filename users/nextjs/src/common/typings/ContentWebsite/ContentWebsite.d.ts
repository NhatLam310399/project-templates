import { IMongoObjectId, ICustomSizeImages } from "@common/typings";
export interface IContentWebsite {
  _id?: IMongoObjectId;
  whiteLogo?: ICustomSizeImages;
  colorLogo?: ICustomSizeImages;
  photos?: ICustomSizeImages;
  address?: string;
  phone?: string;
  footerUserInfo?: [string];
  footerEmployerInfo?: [string];
  customCodeHeader?: string;
  customCodeFooter?: string;
  createdAt?: Date;
  updatedAt?: Date;
  favicon?: ICustomSizeImages;
  facebookImg?: ICustomSizeImages;
}

export interface IFilterContentWebsite {
  phone?: string;
}

export interface IGetAllContentWebsite {
  filterContentWebsite?: IFilterContentWebsite;
  page?: Number;
  size?: Number;
}
