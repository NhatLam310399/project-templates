import { ICustomSizeImagesInput } from "common/typings";
import AvatarDefault from "assets/images/default/avatar-default.jpg";
import BannerDefault from "assets/images/default/image-banner-default.jpg";

export const CUSTOM_SIZE_UPLOAD_AVATAR: ICustomSizeImagesInput = {
  small: {
    width: 100,
    height: null,
  },
  medium: {
    width: 600,
    height: null,
  },
};

export const CUSTOM_SIZE_UPLOAD_ADS_IMAGE: ICustomSizeImagesInput = {
  small: {
    width: 600,
    height: null,
  },
  medium: {
    width: 1250,
    height: null,
  },
};

export const CUSTOM_SIZE_IMAGE_PAGE: ICustomSizeImagesInput = {
  small: {
    width: 600,
    height: null,
  },
  medium: {
    width: 1250,
    height: null,
  },
};
export const AVATAR = AvatarDefault;
export const BANNER = BannerDefault;
