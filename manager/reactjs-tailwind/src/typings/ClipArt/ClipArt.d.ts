import { IMongoObjectId, ICustomSizeImages, ICategory } from "typings"
export interface IClipArt {
  _id?: IMongoObjectId
  name?: string
  image?: ICustomSizeImages
  width?: number
  height?: number
  quality?: string
  category?: ICategory
  isPro?: boolean
  isStaticColor?: boolean;
  slug?: string
  keywords?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IGetAllClipArt {
  filterClipArt?: IFilterClipArt
  page?: number
  size?: number
}
export interface IFilterClipArt {
  name?: string
  category?: string
  isPro?: boolean
}