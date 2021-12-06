/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect } from "react";
import { TextValidator } from "react-material-ui-form-validator";

import ImageUploadLayout from "layouts/ImageUploadLayout";
import SVG from "designs/SVG";
import LinearProgressWithLabel from "components/Progress/LinearProgressWithLabel";

import { IBase64File } from "common/typings";
import { randomId, readFile } from "common/functions";
import { useFormStyles } from "common/styles/muiStyles/useStyles";

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

  const [displayVideo, setDisplayVideo] = useState<string>("");
  const [fileSelected, setFileSelected] = useState<File>();

  const [isError, setIsError] = useState(false);
  const [progress, setProgress] = useState(0);

  const [id, setId] = useState(randomId());

  useEffect(() => {
    if (video) {
      setDisplayVideo(video as string);
    }
  }, [video]);

  const handleProgress = (number: number) => {
    setProgress(number);
  };

  const loadVideo = async (videoFile: File) => {
    const videoSrc = await readFile(videoFile, handleProgress);
    setDisplayVideo(videoSrc);
    onChange?.(videoFile, videoSrc);
  };

  const handleUploadAddNewFile = (files: File[]) => {
    const file = files[0];
    displayVideo && setDisplayVideo("");
    setFileSelected(file);
    if (file?.type.includes("video")) {
      loadVideo(file);
    }
  };

  const renderVideo = (src: string) => {
    return (
      <video
        className="block object-cover max-w-full m-auto max-h-15"
        controls
        src={src}
      />
    );
  };

  const handleValidate = (isValid: boolean) => {
    if (isValid) {
      isError && setIsError(false);
    } else {
      displayVideo && setDisplayVideo("");
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
  if (required) {
    validators.push("required");
    errorMessages.push(errorMessage);
  }
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
                  <SVG
                    name="common/upload-video"
                    className="block m-auto max-h-3 w-auto object-cover"
                  />
                </div>
                <p className="mt-0.5 text-sm font-semibold info text-body text-gray">
                  Thêm video
                </p>
              </>
            )}
          </div>
        </ImageUploadLayout>
        {progress > 0 && <LinearProgressWithLabel value={progress} />}
      </div>
      <TextValidator
        value={fileSelected || ""}
        name={id}
        validatorListener={handleValidate}
        validators={validators}
        errorMessages={errorMessages}
        className={classes.inputFieldHidden}
        FormHelperTextProps={{ component: ErrorMessage }}
      />
    </>
  );
};

export default SingleVideoUploader;
