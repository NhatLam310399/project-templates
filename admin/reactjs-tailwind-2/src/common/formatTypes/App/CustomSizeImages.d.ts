import { IUpload } from "common/formatTypes";
export interface IImageSizeInput {
    width?: number | null;
    height?: number | null;
}
export interface ICustomSizeImages {
    default?: string;
    small?: string;
    medium?: string;
}
export interface ICustomSizeImagesInput {
    small?: IImageSizeInput;
    medium?: IImageSizeInput;
}
export interface ICustomUploadInput {
    type?: "STRING" | "FILE";
    url?: ICustomSizeImages;
    file?: IUpload;
}
