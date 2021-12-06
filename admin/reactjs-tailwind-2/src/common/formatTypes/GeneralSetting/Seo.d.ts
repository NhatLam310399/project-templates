import { IMongoObjectId } from "common/formatTypes";

export interface ISeo {
    _id?: IMongoObjectId;
    seoTitle?: string;
    seoKeyword?: string[];
    author?: string;
    seoSiteMap?: string;
    seoDescription?: string;
    footerContentOfHomepage?: string;
    footerContentOfJobPosting?: string;
    footerContentOfEmployee?: string;
    createdAt?: Date;
    updatedAt?: Date;
    language?: string;
}
export interface IUpdateSeoInput {
    seoTitle?: string;
    seoKeyword?: string[];
    author?: string;
    seoSiteMap?: string;
    seoDescription?: string;
    footerContentOfHomepage?: string;
    footerContentOfJobPosting?: string;
    footerContentOfEmployee?: string;
    language: string;
}

export interface IUpdateSeo {
    fieldsToUpdate: IUpdateSeoInput;
}
