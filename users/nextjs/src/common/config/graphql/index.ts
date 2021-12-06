import { ApolloClient, InMemoryCache } from "apollo-boost";
import { createUploadLink } from "apollo-upload-client";
import "isomorphic-unfetch";

const propertyApiLink = createUploadLink({
  uri: `${process.env.NEXT_PUBLIC_GRAPHQL_URL}/graphql`,
  credentials: "include",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "crossdomain": true,
  },
});

const propertyApi = new ApolloClient({
  ssrMode: true,
  link: propertyApiLink as any,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});

export default propertyApi;
