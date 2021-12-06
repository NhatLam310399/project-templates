import { store } from "index";
import { IGetToken } from "common/typings";
import { axiosJSON } from "common/utils/api";
import { setLoading } from "redux/actions/common";

export const getAccessToken = async (data: IGetToken) => {
  try {
    const url = `${process.env.REACT_APP_GRAPHQL_URL}/auth/firebase/phone`;
    store.dispatch(setLoading(true));
    const response = await axiosJSON({
      url,
      data: JSON.stringify(data),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    store.dispatch(setLoading(false));

    return response;
  } catch (error) {
    console.error(error);
    return {};
  }
};
