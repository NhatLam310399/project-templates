import { IMongoObjectId } from "typings"
export interface IColor {
  _id?: IMongoObjectId
  name?: string
  hex?: string
  slug?: string
  keywords?: string
  createdAt?: Date
  updatedAt?: Date
}