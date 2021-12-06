/* eslint-disable @typescript-eslint/no-explicit-any */
import { propertyApi } from "config/graphql";
import { showNotification } from "redux/actions/notification";
import { store } from "index";
import { DocumentNode } from "@apollo/client";
import axios, { AxiosRequestConfig } from "axios";

import { IGraphQLResponse } from "common/formatTypes";
import { getLoggedInAdmin } from "./auth";

const getToken = () => {
    const user = getLoggedInAdmin();
    return user && user?.accessToken ? `Bearer ${user?.accessToken}` : "";
};
const printErrorOfGraphQLFromServer = (error: any) => {
    let errorMessage = error?.networkError?.result?.errors[0]?.message;
    if (!errorMessage) {
        errorMessage = error?.message;
    }
    console.error(`[GraphQL Error] ${errorMessage}`);
};

const graphQLCommon = async (
    query: DocumentNode,
    variables: any,
): Promise<IGraphQLResponse> => {
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
        console.error(error);
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
