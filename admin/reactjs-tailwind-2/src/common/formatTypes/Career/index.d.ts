import { ICustomSizeImages, IMongoObjectId } from "../App";

export interface ICareer {
    _id?: IMongoObjectId;
    icon?: ICustomSizeImages;
    name?: string;
    keywords?: string;
}
