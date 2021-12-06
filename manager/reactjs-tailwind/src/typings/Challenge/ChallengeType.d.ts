import { IMongoObjectId, ICustomSizeImages, IUser, IChallenge } from "typings"
export interface IChallengeType {
  _id?: IMongoObjectId
  user?: IUser
  challenge?: IChallenge
  doneChallenge?: boolean
  name?: string
  icon?: ICustomSizeImages
  content?: string
  slug?: string
  keywords?: string
  createdAt?: Date
  updatedAt?: Date

}
export interface IGetAllChallengeType {
  filterChallenge?: IFilterChallengeType

}
export interface IFilterChallengeType {
  name?: string
  idChallenge?: string
  idUser?: string
}