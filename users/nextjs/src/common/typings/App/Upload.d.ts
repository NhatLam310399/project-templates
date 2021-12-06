import { ICustomSizeImages } from "@common/typings";

export type IUpload = File;

export type IEditImageType = "STRING" | "FILE";

export interface ICustomUploadInput {
  type: IEditImageType;
  url?: ICustomSizeImages;
  file?: IUpload;
}

export type IBase64Image = string;
