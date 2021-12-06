import { store } from "index";
import { IPlaceState } from "redux/reducers/place";

const renderPermissionTitle = () => {
  let type: string;
  return (title: string): string => {
    if (!type) {
      const { place }: IPlaceState = store.getState?.()?.place || {};
      type = place?.type || "";
    }
    return permissionTitleList[title]?.[type];
  };
};

export const typeTitle = renderPermissionTitle();

const permissionTitleList: Record<any, any> = {
  placeInfo: {
    KARAOKE: "Thông tin quán",
    COMPANY: "Thông tin công ty",
  },
  ownPlaceInfo: {
    KARAOKE: "Thông tin chủ quán",
    COMPANY: "Thông tin chủ công ty",
  },
  placeImage: {
    KARAOKE: "Hình ảnh quán",
    COMPANY: "Hình ảnh công ty",
  },
  placeVideo: {
    KARAOKE: "Video quán",
    COMPANY: "Video công ty",
  },
  placeName: {
    KARAOKE: "Tên quán",
    COMPANY: "Tên công ty",
  },
  ownName: {
    KARAOKE: "Tên chủ quán",
    COMPANY: "Tên chủ công ty",
  },
};
