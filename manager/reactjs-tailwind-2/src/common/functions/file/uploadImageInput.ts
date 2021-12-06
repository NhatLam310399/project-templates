import { IImagesFile, IFileUpload } from "common/typings/App";
import { ICustomUploadInput, ICustomSizeImages } from "common/typings";

export type IUploadImagesInput = ReturnType<typeof uploadImagesInput>;
export const uploadImagesInput = (imageFiles: IImagesFile[]) => {
  const imagesInput = imageFiles.map((imgFile: IImagesFile) => {
    let customUploadInput: ICustomUploadInput = {};
    if ("file" in imgFile) {
      customUploadInput = { type: "FILE", file: imgFile.file };
      return customUploadInput;
    }
    const cloneImgFile: ICustomSizeImages = {
      default: imgFile.default,
      medium: imgFile.medium,
      small: imgFile.small,
    };
    customUploadInput = { type: "STRING", url: cloneImgFile };
    return customUploadInput;
  });
  return imagesInput;
};
