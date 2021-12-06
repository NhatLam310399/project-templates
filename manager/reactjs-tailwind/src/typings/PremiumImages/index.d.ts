import { ICustomSizeImages, IMongoObjectId } from "typings"
export interface IPremiumImage {
  _id?: IMongoObjectId
  name?: string
  image?: ICustomSizeImages
  width?: number
  height?: number
  quality?: string
  price?: Int
  tag?: string
  slug?: string
  keywords?: string
  createdAt?: Date
  updatedAt?: Date
}
export interface IFilterPremiumImage {
  name?: string
  tag?: string
}
export interface IGetAllPremiumImage {
  filterPremiumImage?: IFilterPremiumImage
}