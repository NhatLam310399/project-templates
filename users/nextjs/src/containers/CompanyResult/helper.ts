import { Dispatch } from "react";

import { IGraphQLResponse, IProvince } from "@common/typings";
import { getProvincesSuccess } from "@redux/actions/location";
import { getProvinces } from "@services/location";

interface IProps {
  slugProvince?: string;
  dispatch: Dispatch<any>;
}

export class FindCompanyAPICaller {
  constructor(private readonly props: IProps) {}

  async getProvinces() {
    const provinces = await getProvinceAPI();
    if (provinces) {
      this.props.dispatch(getProvincesSuccess(provinces));
    }
  }
}

const getProvinceAPI = async (): Promise<IProvince[]> => {
  try {
    const response: IGraphQLResponse = await getProvinces();
    const { getProvinces: results } = response?.data;
    return results?.provinces || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
