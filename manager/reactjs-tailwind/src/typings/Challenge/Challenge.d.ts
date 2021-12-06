import { IMongoObjectId, ICustomSizeImages, IChallengeType } from "typings"
export interface IChallenge {
  _id?: IMongoObjectId
  name?: string
  icon?: ICustomSizeImages
  content?: string
  stepNumber?: number
  slug?: string
  keywords?: string
  createdAt?: Date
  updatedAt?: Date
  point?: number;
}