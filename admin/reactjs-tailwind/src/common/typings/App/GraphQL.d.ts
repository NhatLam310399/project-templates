import { ApolloQueryResult } from "@apollo/client";

export type IGraphQLResponse = ApolloQueryResult<any>;

export type IAction = "GET" | "CREATE" | "UPDATE" | "DELETE" | "";
