import { IMongoObjectId, ICustomSizeImages, IChallengeType } from "typings"
export interface IShortcut {
  _id?: IMongoObjectId
  name?: string
  icon?: ICustomSizeImages
  content?: string
  slug?: string
  keywords?: string
  createdAt?: Date
  updatedAt?: Date
  point?: number;
  url?: string;
}