import { ICustomSizeImages, ITypes } from "typings";
import { ICountry } from "typings/Location/Country";

/**
 * @NOTE IColor.hex properly has "/" inside (ex: "#00000/#2f2f2f")
 */
export type IColor = {
  hex: string;
  name: string;
};

export type IRectCanvas = {
  // Each of them has range from 0 to 1. means %
  x: number;
  y: number;
  w: number;
  h: number;
  rotate?: number; // Deg
  widthByInch: number; // inch
  heightByInch: number; // inch
};

export interface ISideType {
  _id: string;
  name: string;
}

export interface IColorSchema {
  name: string;
  color: IColor;
  heather?: ICustomSizeImages;
}

export interface IProductDemo {
  _id: string;
  name: string;
  sideType?: ISideType;
  upperImage: ICustomSizeImages;
  clipPath: IRectCanvas;
  colorSchemas: IColorSchema[];
  designedTemplateSideId: string;
}

export interface IProductSide {
  _id?: string;
  sideType: ISideType;
  upperImage: ICustomSizeImages;
  colorSchemas: IColorSchema[];
  clipPath: IRectCanvas;
}

export interface IProductMockup {
  _id?: string;
  name: string;
  upperImage: ICustomSizeImages;
  colorSchemas: IColorSchema[];
  clipPath: IRectCanvas;
  designedTemplateSideId: string;
  demos: IProductDemo[];
}

export interface IProductSchema {
  _id?: string;
  name?: string;
  colors?: IColor[];
  sides?: IProductSide[];
  mockups?: IProductMockup[];
  rate: number;
  reviewCount: number;
  price: number;
  sizes: ITypes[];
  status: ITypes;
  image: ICustomSizeImages;
  fromCountries: ICountry[];
}

export interface IStoreTemplateDesigned {
  isEdited?: boolean;
  productDesignSchemaId: string;
  colors: IColor[];
  sides: {
    sideType: ISideType;
    objects: fabric.Object[];
    base64TemplateImage: string | null;
  }[];
}
