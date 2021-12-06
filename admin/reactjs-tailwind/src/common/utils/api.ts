import { propertyApi } from "config/graphql";
import { showNotification } from "redux/actions/notification";
import { store } from "index";
import { DocumentNode } from "@apollo/client";
import axios, { AxiosRequestConfig } from "axios";
import { getLoggedInAccount } from "./auth";

const getToken = () => {
  const user = getLoggedInAccount();
  return user && (user?.token || user?.accessToken)
    ? `Bearer ${user?.token || user?.accessToken}`
    : "";
};
console.log(getToken());

const printErrorOfGraphQLFromServer = (error: any) => {
  let errorMessage = error?.networkError?.result?.errors[0]?.message;
  if (!errorMessage) {
    errorMessage = error?.message;
  }
  console.error(`[GraphQL Error] ${errorMessage}`);
};

const graphQLCommon = async (query: DocumentNode, variables: any) => {
  try {
    const response = await propertyApi.query({
      query,
      variables,
      context: {
        headers: {
          Authorization: getToken(),
        },
      },
    });
    const { errors = [] } = response;
    if (errors.length > 0) {
      console.error({ errors });
      printErrorOfGraphQLFromServer(errors[0]);
      const { message = "" } = errors[0] || {};
      store.dispatch(
        showNotification({
          type: "error",
          title: "Có lỗi xảy ra",
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
        title: "Có lỗi xảy ra",
        message:
          error?.messages?.[0]?.vi ||
          "Hệ thống đang cập nhật, vui lòng chờ trong giây lát !",
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
