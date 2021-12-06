import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextValidator } from "react-material-ui-form-validator";
import { LinearProgress, Box, Typography } from "@material-ui/core";

import { IBase64File } from "common/typings";
import { randomId, readFile } from "common/functions";
import { IRootState, IVideo } from "common/typings/App";
import { useFormStyles } from "common/styles/muiStyles/useStyles";

import CircularLoading from "components/Progress/CircularLoading";
import ErrorMessage from "components/ErrorMessage";

import IconButton from "designs/IconButton";
import { GlobalIcon } from "designs/icons/GlobalIcon";
import SVG from "designs/SVG";

import ImageUploadLayout from "layouts/ImageUploadLayout";

import { showNotification } from "redux/actions/notification";

const VIDEO_SIZE = 629145600; // 600MB
interface IMultipleVideoUploader {
  className?: string;
  title?: string;
  required?: boolean;
  maxNumberImage?: number;
  errorMessage?: string;
  videos: IVideo[];
  previewMode?: boolean;
  onSingleChange?: (videos: File, url: IBase64File) => void;
  onChange?: (videos: IVideo[], url: IBase64File[]) => void;
}

const MultipleVideoUploader: React.FC<IMultipleVideoUploader> = props => {
  const dispatch = useDispatch();
  const {
    videos = [],
    required = false,
    errorMessage = "",
    title = "",
    onChange,
    className = "",
    onSingleChange,
    previewMode = true,
    maxNumberImage = 999,
  } = props;
  const classes = useFormStyles({});

  const [displayVideos, setDisplayVideos] = useState<IBase64File[]>([]);
  const validators = required ? ["required"] : [];
  const [fileSelected, setFileSelected] = useState<File | undefined>();
  const [listVideos, setListVideos] = useState<IVideo[]>([]);
  const [progress, setProgress] = useState(0);

  const [isError, setIsError] = useState(false);
  const [id, setId] = useState(randomId());

  useEffect(() => {
    if (videos.length > 0) {
      setDisplayVideos(videos as string[]);
      setListVideos(videos);
    }
  }, [videos]);

  const loadVideo = async (video: File) => {
    const videoSrc = await readFile(video, progressNumber => {
      setProgress(progressNumber);
    });
    const videosDisplay = [...displayVideos, videoSrc as string];
    const videosFile = [...listVideos, video];
    setDisplayVideos(videosDisplay);
    setListVideos(videosFile);
    onChange && onChange(videosFile, videosDisplay);
    onSingleChange?.(video, videoSrc);
  };
  const handleUploadAddNewFile = (files: File[]) => {
    const file = files[0];
    setFileSelected(file);
    // const isVideo = typeVideo.includes(file.type);
    if (file.size > VIDEO_SIZE) {
      dispatch(
        showNotification({
          type: "warning",
          title: "",
          message: "Dung lượng video phải nhỏ hơn 600MB.",
        }),
      );
    } else {
      loadVideo(file);
    }
  };
  const handleDeleteImage = (index: number) => {
    if (listVideos) {
      const newVideoList = [...listVideos];
      newVideoList?.splice(index, 1);
      const newDisplayList = [...displayVideos];
      newDisplayList?.splice(index, 1);
      setDisplayVideos(newDisplayList);
      setListVideos(newVideoList);
      onChange && onChange(newVideoList, newDisplayList);
    }
  };
  const handleValidate = (isValid: boolean) => {
    if (isValid) {
      isError && setIsError(false);
    } else {
      !isError && setIsError(true);
    }
  };
  const AddVideosUploadButton: React.FC = () => (
    <ImageUploadLayout
      onUpload={handleUploadAddNewFile}
      disabled={displayVideos.length >= maxNumberImage}
      accept="video/*"
    >
      <div className="input-display rounded-md p-1.5 w-full text-center">
        <div className="text-center default-display">
          <div className="icon">
            <GlobalIcon.UploadVideo className="block m-auto h-3 w-auto object-cover" />
          </div>
          <p className="mt-1 text-sm font-semibold info text-body text-gray">
            Tải lên video
          </p>
        </div>
      </div>
    </ImageUploadLayout>
  );
  const RenderPreviewVideo: React.FC = () => {
    return displayVideos?.length > 0 ? (
      <ul className="flex flex-wrap w-full gap-2 mt-2">
        {displayVideos.map((video: string, index: number) => (
          <div
            className="relative w-12 h-12 laptop:w-15 laptop:h-15 img-wrapper"
            key={String(index)}
          >
            <video
              className="object-cover w-full h-full"
              controls
              src={video}
            />
            <IconButton
              svgName="common/delete-image"
              title="Xoá video này"
              className="absolute z-10 cursor-pointer fill-current text-primary -top-1 -right-1"
              onClick={() => handleDeleteImage(index)}
            />
          </div>
        ))}
      </ul>
    ) : null;
  };

  return (
    <div className={`w-full ${className} `}>
      <div>
        <p className="mb-0.5 text-lg font-semibold">
          {title} <span className="text-red">{required && "*"}</span>
        </p>
        <AddVideosUploadButton />
        {progress > 0 && (
          <Box style={{ display: "flex", alignItems: "center" }}>
            <Box style={{ width: "100%", marginRight: "10px" }}>
              <LinearProgress variant="determinate" value={progress} />
            </Box>
            <Box style={{ minWidth: 35 }}>
              <Typography variant="body2">{`${progress}%`}</Typography>
            </Box>
          </Box>
        )}
        {previewMode ? <RenderPreviewVideo /> : null}
      </div>
      {required && (
        <TextValidator
          value={displayVideos.length ? id : ""}
          name={id}
          validators={validators}
          errorMessages={[errorMessage]}
          className={classes.inputFieldHidden}
          validatorListener={handleValidate}
          FormHelperTextProps={{ component: ErrorMessage }}
        />
      )}
    </div>
  );
};

export default MultipleVideoUploader;
