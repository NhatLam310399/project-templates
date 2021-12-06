import React, { useEffect, useState } from "react";
import {
  ICustomSizeImages,
  ICustomUploadInput,
  ICustomUploadInputVideo,
  IFileUpload,
  IRoom,
  IVideosFile,
} from "common/typings";

import { uploadVideosInput } from "common/functions";
import IconButton from "designs/IconButton";
import MultipleVideoUploader from "components/MultipleVideoUploader";

interface IRoomVideosProps {
  onCreateVideos?: (uploadVideos?: File[]) => void;
  onUpdateVideos?: (uploadImages: ICustomUploadInputVideo[]) => void;
  editField?: IRoom;
  className?: string;
}

const RoomVideos: React.FC<IRoomVideosProps> = props => {
  const { className, onCreateVideos, onUpdateVideos, editField } = props;
  const [videoList, setVideoList] = useState<IVideosFile[]>([]);

  useEffect(() => {
    if (editField) {
      const { video } = editField;
      video?.length && setVideoList(video);
    }
  }, [editField]);

  useEffect(() => {
    if (editField) {
      const updateVideoList = uploadVideosInput(videoList);
      onUpdateVideos?.(updateVideoList);
    } else {
      const createVideoList = videoList.map(video => {
        const { file } = video as IFileUpload;
        return file;
      });
      onCreateVideos?.(createVideoList);
    }
  }, [videoList]);

  const handleChange = (file: File, base64File: string) => {
    setVideoList(state => [...state, { file, base64File }]);
  };

  const handleDeleteImage = (index: number) => {
    const newImageFileList = videoList.filter(
      (_, itemIndex) => itemIndex !== index,
    );
    setVideoList(newImageFileList);
  };
  return (
    <div className={`${className}`}>
      <MultipleVideoUploader
        title="Video phòng"
        onSingleChange={handleChange}
        previewMode={false}
        videos={[]}
      />
      {videoList?.length ? (
        <div className="flex flex-nowrap gap-1 overflow-x-auto pt-1">
          {videoList.map((video, index) => {
            if (!video) return null;
            const urlSrc = typeof video === "string" ? video : video.base64File;
            return (
              <div className="relative w-8 h-10 max-w-full" key={String(index)}>
                <video className="object-cover w-full h-full" controls>
                  <source src={urlSrc} />
                </video>
                <IconButton
                  svgName="common/delete-image"
                  title="Xoá"
                  className="absolute fill-current w-1.5 h-1.5 text-primary -top-0.5 -right-0.5 cursor-pointer z-10"
                  onClick={() => handleDeleteImage(index)}
                />
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default RoomVideos;
