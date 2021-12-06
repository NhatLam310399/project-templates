import { IGetToken } from "typings";
import { axiosJSON } from "common/utils/api";
// import { setLoading } from "redux/actions/commonActions";

export const getAccessToken = async (payload: IGetToken) => {
  console.log("login", payload);
  try {
    const { loginMethod, data } = payload;
    const url = `${process.env.REACT_APP_GRAPHQL_URL}/auth/firebase/${loginMethod}`;
    console.log("url", url);
    const response = await axiosJSON({
      url,
      data: JSON.stringify(data),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    // store.dispatch(setLoading(false));

    return response;
  } catch (error) {
    console.error(error);
    return {};
  }
};
