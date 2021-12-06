import { axiosJSON } from "common/utils/api";

const ACCESS_TOKEN = `${process.env.REACT_APP_GOONG_API_KEY}`;

export const getUrlParamsString = (params: Record<any, any>): string => {
  return new URLSearchParams(params).toString();
};

export const getPlaceAutoComplete = async (input: string) => {
  const url = `https://rsapi.goong.io/Place/AutoComplete`;
  try {
    const response = await axiosJSON({
      url,
      method: "GET",
      params: {
        api_key: ACCESS_TOKEN,
        input,
        radius: "3000",
      },
      paramsSerializer: paramsObject => getUrlParamsString(paramsObject),
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const getPlaceDetail = async (place_id: string) => {
  const url = `https://rsapi.goong.io/Place/Detail`;

  try {
    const response = await axiosJSON({
      url,
      method: "GET",
      params: {
        api_key: ACCESS_TOKEN,
        place_id,
      },
      paramsSerializer: paramsObject => getUrlParamsString(paramsObject),
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.error(error);
    return {};
  }
};
