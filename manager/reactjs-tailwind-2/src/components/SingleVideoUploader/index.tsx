/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect } from "react";
import { IBase64File, IVideo } from "common/typings";
import ImageUploadLayout from "layouts/ImageUploadLayout";
import { randomId, readFile } from "common/functions";
import { LinearProgress, Box, Typography } from "@material-ui/core";

import { TextValidator } from "react-material-ui-form-validator";
import { useFormStyles } from "common/styles/muiStyles/useStyles";
import { GlobalIcon } from "designs/icons/GlobalIcon";
import ErrorMessage from "components/ErrorMessage";

const VIDEO_SIZE = 629145600; // 600MB
interface ISingleVideoUploaderProps {
  className?: string;
  label: string;
  required?: boolean;
  errorMessage?: string;
  video?: string;
  previewMode?: boolean;
  onChange: (videos: File, url?: IBase64File) => void;
}

const SingleVideoUploader: React.FC<ISingleVideoUploaderProps> = props => {
  const {
    video = "",
    required = false,
    errorMessage = "",
    label = "",
    className = "",
    onChange,
    previewMode = true,
  } = props;
  const classes = useFormStyles({});

  const [progress, setProgress] = useState(0);

  const [displayVideo, setDisplayVideo] = useState<string>("");
  const [fileSelected, setFileSelected] = useState<File | undefined>();

  const [isError, setIsError] = useState(false);
  const [id, setId] = useState(randomId());

  useEffect(() => {
    if (video) {
      setDisplayVideo(video as string);
    }
  }, [video]);

  const loadVideo = async (videoFile: File) => {
    const videoSrc = await readFile(videoFile, progressNumber => {
      setProgress(progressNumber);
    });
    setDisplayVideo(videoSrc);

    onChange?.(videoFile, videoSrc);
  };

  const handleUploadAddNewFile = (files: File[]) => {
    const file = files[0];
    setFileSelected(file);
    // const isVideo = typeVideo.includes(file.type);
    if (file.size > VIDEO_SIZE) {
      setIsError(true);
    } else {
      isError && setIsError(false);
      loadVideo(file);
    }
  };

  const handleValidate = (isValid: boolean) => {
    if (isValid) {
      isError && setIsError(false);
    } else {
      !isError && setIsError(true);
    }
  };

  const accept = "video/mpeg,video/mp4,video/quicktime,video/x-msvideo";
  const requiredValidator = required ? ["required"] : [];
  const validators = [
    ...requiredValidator,
    `maxFileSize:${600 * 1024 * 1024}`,
    `allowedExtensions:${accept}`,
  ];
  const requiredMessage = required ? [errorMessage] : [];
  const errorMessages = [
    ...requiredMessage,
    "Dung lượng file phải nhỏ hơn 600MB.",
    "Định dạng video không đúng",
  ];

  const renderVideo = (src: string) => {
    return (
      <video
        className="block object-cover h-full max-h-10 max-w-full m-auto"
        controls
        src={src}
      />
    );
  };

  return (
    <>
      <div className={`w-full ${className} `}>
        <p className="block mb-0.5 text-lg font-medium leading-none">
          {label}
          <span className="text-error">{required && "*"}</span>
        </p>
        <ImageUploadLayout onUpload={handleUploadAddNewFile} accept={accept}>
          <div className="input-display rounded-md p-1.5 w-full text-center">
            {previewMode && displayVideo ? (
              renderVideo(displayVideo)
            ) : (
              <>
                <div className="icon">
                  <GlobalIcon.UploadVideo className="block m-auto h-3 w-auto object-cover" />
                </div>
                <p className="mt-0.5 text-sm font-semibold info text-body text-gray">
                  Thêm video
                </p>
              </>
            )}
          </div>
        </ImageUploadLayout>
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
      </div>
      {required && (
        <TextValidator
          value={fileSelected || video || ""}
          name={id}
          validators={fileSelected ? validators : requiredValidator}
          errorMessages={fileSelected ? errorMessages : requiredMessage}
          className={`${classes.inputFieldHidden} hidden`}
          validatorListener={handleValidate}
          FormHelperTextProps={{ component: ErrorMessage }}
        />
      )}
    </>
  );
};

export default SingleVideoUploader;
