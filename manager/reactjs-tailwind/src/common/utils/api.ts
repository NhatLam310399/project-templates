import { DocumentNode } from "@apollo/client";
import axios, { AxiosPromise, AxiosRequestConfig } from "axios";
import { getToken } from "./auth";
import { propertyApi } from "common/config/graphql";
import { showNotification } from "redux/actions/notification";
import { store } from "index";

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
    const { errors = [] } = response;
    if (errors.length > 0) {
      printErrorOfGraphQLFromServer(errors[0]);
      const { message = "" } = errors[0] || {};
      store.dispatch(
        showNotification({
          type: "error",
          title: "lỗi",
          message,
        }),
      );
    }
    return response;
  } catch (error: any) {
    printErrorOfGraphQLFromServer(error);
    store.dispatch(
      showNotification({
        type: "error",
        title: "lỗi",
        message: error.message,
      }),
    );
    return error;
  }
};

const axiosJSON = (options: AxiosRequestConfig) => {
  return axios(options)
    .then(res => res)
    .catch(error => error);
};

export { graphQLCommon, axiosJSON };
