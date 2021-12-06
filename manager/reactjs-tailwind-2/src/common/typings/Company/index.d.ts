import {
  IMongoObjectId,
  IProvince,
  IDistrict,
  IWard,
  ICustomSizeImages,
  IPlaceType,
  IUser,
  IPointGeometry,
} from "common/typings";

export interface ICompany {
  _id: IMongoObjectId;
  name: string;
  phoneNumber: string;
  email: string;
  province: IProvince;
  district: IDistrict;
  ward: IWard;
  street: string;
  introduce: string;
  images: ICustomSizeImages[];
  logo: ICustomSizeImages;
  videos: string[];
  licenseImages: ICustomSizeImages[];
  status: boolean;
  type: IPlaceType;
  user: IUser;
  amountRoom: number;
  price: number;
  rate: number;
  highlight: boolean;
  description: string;
  enabled: boolean;
  slug: string;
  keywords: string;
  location: IPointGeometry;
  favorites: number;
  slugLink: string;
  slugLinkWeb: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IGetCompanyByBoss {
  idUser: string;
}
