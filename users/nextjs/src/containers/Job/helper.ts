import { Dispatch } from "react";

import { cleanObject } from "@common/functions";
import {
  IAds,
  ICategoryLevel2,
  IGetCategoryLevel2,
  IGraphQLResponse,
  IJobLevel,
  IJobType,
  ILevelPrice,
  IProvince,
} from "@common/typings";

import {
  getAllJobLevelFilterSuccess,
  getAllJobTypeSuccess,
  getAllLevelPriceSuccess,
} from "@redux/actions/job";
import { getProvincesSuccess } from "@redux/actions/location";
import { getAllRecruitment } from "@redux/actions/recruitment";
import { getAdsJobPageSuccess } from "@redux/actions/ads";

import { getCategoryLevel2 } from "@services/category";
import { getAllJobLevel, getAllJobType, getAllLevelPrice } from "@services/job";
import { getProvinces } from "@services/location";
import { getAdsByLocation } from "@services/ads";
import { ADS_LOCATION } from "@constants/ads";
import { getAllCategoryLevel2 } from "@redux/actions/category";

interface IProps {
  dispatch: Dispatch<any>;
}

interface IPropsAds {
  dispatch: Dispatch<any>;
}

export const getAllCategoryLv2API = (page: number) => {
  const payload: IGetCategoryLevel2 = {
    page,
  };
  return getAllCategoryLevel2(payload);
};
export class FindJobAPICaller {
  constructor(private readonly props: IProps) {}

  async getProvinceAndSelect() {
    const provinces = await getProvinceAPI();
    if (provinces) {
      this.props.dispatch(getProvincesSuccess(provinces));
    }
  }

  async filterAllJobAPI() {
    const { dispatch } = this.props;
    dispatch(
      getAllRecruitment({
        filterRecruitment: {
          sortType: "latest",
        },
        page: 0,
      }),
    );
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

//API get ads

export class AdsJobAPICaller {
  constructor(private readonly props: IPropsAds) {}

  async getAds1() {
    const ads = await getAds1JobPage();
    if (ads) {
      this.props.dispatch(getAdsJobPageSuccess(ads));
    }
  }
  async getAds2() {
    const ads = await getAds2JobPage();
    if (ads) {
      this.props.dispatch(getAdsJobPageSuccess(ads));
    }
  }
  async getAds3() {
    const ads = await getAds3JobPage();
    if (ads) {
      this.props.dispatch(getAdsJobPageSuccess(ads));
    }
  }
  async getAds4() {
    const ads = await getAds4JobPage();
    if (ads) {
      this.props.dispatch(getAdsJobPageSuccess(ads));
    }
  }
  async getAds5() {
    const ads = await getAds5JobPage();
    if (ads) {
      this.props.dispatch(getAdsJobPageSuccess(ads));
    }
  }
}

const getAds1JobPage = async (): Promise<IAds[]> => {
  try {
    const response: IGraphQLResponse = await getAdsByLocation({
      displayLocation: ADS_LOCATION.FIND_JOB_1,
    });
    const { getAdsAllByLocation: results } = response?.data;
    return results || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getAds2JobPage = async (): Promise<IAds[]> => {
  try {
    const response: IGraphQLResponse = await getAdsByLocation({
      displayLocation: ADS_LOCATION.FIND_JOB_2,
    });
    const { getAdsAllByLocation: results } = response?.data;
    return results || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
const getAds3JobPage = async (): Promise<IAds[]> => {
  try {
    const response: IGraphQLResponse = await getAdsByLocation({
      displayLocation: ADS_LOCATION.FIND_JOB_3,
    });
    const { getAdsAllByLocation: results } = response?.data;
    return results || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
const getAds4JobPage = async (): Promise<IAds[]> => {
  try {
    const response: IGraphQLResponse = await getAdsByLocation({
      displayLocation: ADS_LOCATION.FIND_JOB_4,
    });
    const { getAdsAllByLocation: results } = response?.data;
    return results || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
const getAds5JobPage = async (): Promise<IAds[]> => {
  try {
    const response: IGraphQLResponse = await getAdsByLocation({
      displayLocation: ADS_LOCATION.FIND_JOB_5,
    });
    const { getAdsAllByLocation: results } = response?.data;
    return results || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
