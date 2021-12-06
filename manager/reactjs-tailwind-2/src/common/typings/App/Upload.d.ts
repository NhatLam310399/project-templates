import { ICustomSizeImages, ICustomSizeImagesInput } from "common/typings";

export type IUpload = File;

export type IEditImageType = "STRING" | "FILE";
export interface ICustomUploadInput {
  type?: IEditImageType;
  url?: ICustomSizeImages;
  file?: IUpload;
}
export interface ICustomUploadInputVideo {
  type?: IEditImageType;
  url?: string;
  file?: IUpload;
}

export type IBase64File = string;
export type IVideo = File | string | undefined | null;
export type IImage = File | string | undefined | null;
export interface IFileUpload {
  file: File;
  base64File: string;
}
export type IImagesFile = IFileUpload | ICustomSizeImages;

export type IVideosFile = IFileUpload | IBase64File;
