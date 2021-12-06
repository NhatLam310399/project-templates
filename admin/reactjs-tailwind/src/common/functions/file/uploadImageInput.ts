import { IImagesFile, IFileUpload } from "common/typings/App";
import { removeTypenameObj } from "common/functions";
import { ICustomUploadInput, ICustomSizeImages } from "common/typings";

export type IUploadImagesInput = ReturnType<typeof uploadImagesInput>;
export const uploadImagesInput = (imageFiles: IImagesFile[]) => {
  const imagesInput = imageFiles.map((imgFile: IImagesFile) => {
    let customUploadInput: ICustomUploadInput = {};
    if ("file" in imgFile) {
      customUploadInput = { type: "FILE", file: imgFile.file };
      return customUploadInput;
    }

    const cloneImgFile: ICustomSizeImages = removeTypenameObj(imgFile);
    customUploadInput = { type: "STRING", url: cloneImgFile };
    return customUploadInput;
  });
  return imagesInput;
};
