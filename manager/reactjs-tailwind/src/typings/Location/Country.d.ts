import { IMongoObjectId } from "typings";

export interface ICountry {
  _id?: IMongoObjectId;
  name?: string;
  unit?: string;
  code?: string;
  longitude?: number;
  latitude?: number;
  slug?: string;
  nameEn?: string;
  slugEn?: string;
}
