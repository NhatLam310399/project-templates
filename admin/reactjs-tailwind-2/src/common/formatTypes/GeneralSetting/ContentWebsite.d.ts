import {
    IMongoObjectId,
    ICustomSizeImages,
    ICustomSizeImagesInput,
    IUpload,
} from "common/formatTypes";

export interface IContentWebsite {
    _id?: IMongoObjectId;
    whiteLogo?: ICustomSizeImages;
    colorLogo?: ICustomSizeImages;
    photos?: ICustomSizeImages;
    address?: string;
    phone?: string;
    footerUserInfo?: string[];
    footerEmployerInfo?: string[];
    customCodeHeader?: string;
    customCodeFooter?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IContentWebsiteUpdateInput {
    whiteLogo?: IUpload;
    colorLogo?: IUpload;
    photos?: IUpload;
    address?: string;
    phone?: string;
    footerInfo1?: string;
    footerInfo2?: string;
    footerInfo3?: string;
    footerInfo4?: string;
    customCodeHeader?: string;
    customCodeFooter?: string;
    customSizeImageForWhiteLogo?: ICustomSizeImagesInput;
    customSizeImageForColorLogo?: ICustomSizeImagesInput;
}

export interface IUpdateContentWebsite {
    id: IMongoObjectId;
    fieldsToUpdate: IContentWebsiteUpdateInput;
}
