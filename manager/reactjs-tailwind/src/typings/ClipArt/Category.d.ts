import { IMongoObjectId } from "typings"
export interface ICategory {
  _id?: IMongoObjectId
  name?: string
  code?: ICategoryCode
  description?: string
  tags?: string[]
  isPro?: boolean
  slug?: string
  keywords?: string
  createdAt?: Date
  updatedAt?: Date
}

export type ICategoryCode = "clipArt" | "quickDesign" | "blog" | "premiumImage";

export interface IGetAllCategory {
  filterCategory?: IFilterCategory
  page?: number
  size?: number
}
export interface IFilterCategory {
  name?: string
  tag?: string
  isPro?: boolean
  code?: ICategoryCode
}