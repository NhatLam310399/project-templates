import { getAllBlog } from "@redux/actions/blog";
import { IGetAllBlog, IGraphQLResponse } from "@common/typings";
import { getAdsByLocation } from "@services/ads";
import { ADS_LOCATION } from "@constants/ads";
export const getAllBlogAPI = () => {
  const payload: IGetAllBlog = {
    filterCareerCounseling: {
      target: "CANDIDATE",
    },
    page: 0,
    size: 3,
  };
  return getAllBlog(payload);
};

export const getAdsByLocation2 = async () => {
  const response: IGraphQLResponse = await getAdsByLocation({
    displayLocation: ADS_LOCATION.CENTER_BOTTOM_OF_HOME,
  });
  const { getAdsAllByLocation: result } = response?.data || {};
  return result;
};
