import { IMongoObjectId } from "@common/typings";
export interface IMostKeyword {
  _id: IMongoObjectId;
  name: string;
  description: string;
  keywords: string;
  isHot: boolean;
  searchTime: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface IKeyWord {
  _id?: IMongoObjectId;
  name?: string;
  description?: string;
  keywords?: string;
  slug?: string;
  isHot?: boolean;
  searchTime?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
