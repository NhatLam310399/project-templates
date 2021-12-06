import propertyApi from "@common/config/graphql";
import { DocumentNode } from "graphql";
import axios, { AxiosRequestConfig } from "axios";
import { getToken } from "./auth";

const printErrorOfGraphQLFromServer = (error: any) => {
  let errorMessage = error?.networkError?.result?.errors[0]?.message;
  if (!errorMessage) {
    errorMessage = error?.message;
  }
  console.error("\x1b[31m", `⚠️ [GraphQL Error] ${errorMessage}`, "\x1b[37m");
};

const graphQLCommon = async (query: DocumentNode, variables: any) => {
  try {
    const response = await propertyApi.query({
      query,
      variables,
      context: {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    });

    const errors = response?.errors || [];

    if (errors.length > 0) printErrorOfGraphQLFromServer(errors[0]);

    return response;
  } catch (error) {
    printErrorOfGraphQLFromServer(error);
    return error;
  }
};

const axiosJSON = (options: AxiosRequestConfig) => {
  return axios(options)
    .then((res) => res)
    .catch((error) => error);
};

export { graphQLCommon, axiosJSON };
