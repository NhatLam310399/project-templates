import React from "react";

export type IMongoObjectId = string;
export type RenderProp<M, R = React.ReactNode> = R | ((modifiers: M) => R);
export interface IGetById {
    id: IMongoObjectId;
}
export interface IGetBySlug {
    slug: string;
}
export interface IGetByLanguage {
    language: string;
}
export type ISortType = "latest";
