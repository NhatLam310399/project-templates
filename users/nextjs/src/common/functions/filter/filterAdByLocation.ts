import { IAds, IMongoObjectId } from "@common/typings";

export const filterAdByLocation = (
  location: IMongoObjectId,
  listAds: IAds[],
) => {
  const ads = listAds.filter((item) => item?.displayLocation?._id === location);
  return ads || [];
};
