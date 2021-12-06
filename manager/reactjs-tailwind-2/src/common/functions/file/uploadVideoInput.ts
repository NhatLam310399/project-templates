import {
  ICustomUploadInputVideo,
  IVideosFile,
  IFileUpload,
} from "common/typings";

export type IUploadVVideosInput = ReturnType<typeof uploadVideosInput>;

export const uploadVideosInput = (videoFiles: IVideosFile[]) => {
  const videosInput = videoFiles.map((imgFile: IVideosFile) => {
    let customUploadVideoInput: ICustomUploadInputVideo = {};
    if (typeof imgFile === "string") {
      customUploadVideoInput = { type: "STRING", url: imgFile || "" };
      return customUploadVideoInput;
    }
    customUploadVideoInput = { type: "FILE", file: imgFile.file };
    return customUploadVideoInput;
  });
  return videosInput;
};
