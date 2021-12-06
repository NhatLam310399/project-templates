import {
  ICustomSizeImages,
  IMongoObjectId,
  IUpload,
  ICustomSizeImagesInput,
} from "@common/typings";

export interface IBenefit {
  _id?: IMongoObjectId;
  icon?: ICustomSizeImages;
  name?: string;
  keywords?: string;
  description?: string;
}

export interface IFilterBenefit {
  name?: string;
}

export interface IBenefitInput {
  icon?: IUpload;
  name?: string;
  customSizeForUploadImage?: ICustomSizeImagesInput;
}

export interface ICreateBenefit {
  benefitInput: IBenefitInput;
}

export interface IUpdateBenefit {
  id: string;
  benefitInput: IBenefitInput;
}

export interface IGetAllBenefit {
  filterBenefit?: IFilterBenefit;
  page?: number;
  size?: number;
}

export interface IBenefitBanner {
  title: string;
  content: string;
}

export interface IBenefitType {
  _id?: IMongoObjectId;
  icon?: IBenefit;
  content?: string;
}
