import { ApolloQueryResult } from "@apollo/client";

export type IGraphQLResponse = ApolloQueryResult<any>;

export interface IResultResponseApi {
  success?: boolean;
  errorMessage?: string;
}

export interface IGetBySlug {
  slug: string;
}
