import { IAccount, IGetToken } from "@common/typings";
import { axiosJSON } from "@common/utils/api";
import { AxiosError, AxiosResponse } from "axios";
// import { setLoading } from "redux/actions/commonActions";

export const getAccessToken = async (
  payload: IGetToken,
): Promise<AxiosResponse<IAccount> | AxiosError> => {
  const { data, loginMethod } = payload;
  try {
    const url = `${process.env.NEXT_PUBLIC_GRAPHQL_URL}/auth/firebase/${loginMethod}`;
    const response = await axiosJSON({
      url,
      data: JSON.stringify(data),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
