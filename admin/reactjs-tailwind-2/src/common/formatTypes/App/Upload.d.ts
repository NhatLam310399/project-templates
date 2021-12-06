import { ICustomSizeImages } from "common/formatTypes";

export type IUpload = File;

// export interface ICustomUploadInput {
//     type: string;
//     url: ICustomSizeImages;
//     file: IUpload;
// }

export type IBase64Image = string;
export interface IFileUpload {
    file: File;
    base64File: string;
}
export type IImagesFile = IFileUpload | ICustomSizeImages;
