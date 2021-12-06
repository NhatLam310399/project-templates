/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect } from "react";
import ImageUploadLayout from "layouts/ImageUploadLayout";
import { LinearProgress, Box, Typography } from "@material-ui/core";

import { randomId } from "common/functions";
import { useFormStyles } from "common/styles/muiStyles/useStyles";

import { TextValidator } from "react-material-ui-form-validator";
import ErrorMessage from "components/ErrorMessage";
import { GlobalIcon } from "designs/icons/GlobalIcon";

const FILE_SIZE = 629145600; // 600MB
interface ISingleVideoUploaderProps {
  className?: string;
  label: string;
  required?: boolean;
  errorMessage?: string;
  file?: string;
  accept?: string;
  onChange: (file: File, fileName?: string) => void;
}

const SingleFileUploader: React.FC<ISingleVideoUploaderProps> = props => {
  const {
    file = "",
    required = false,
    errorMessage = "",
    label = "",
    className = "",
    accept = ".zip,.rar,.7zip",
    onChange,
  } = props;

  const classes = useFormStyles({});

  const [progress, setProgress] = useState(0);

  const [displayFile, setDisplayFile] = useState<string>("");
  const [fileSelected, setFileSelected] = useState<File | undefined>();
  const [errorMaxSize, setErrorMaxSize] = useState(false);
  const [isError, setIsError] = useState(false);
  const [id, setId] = useState(randomId());

  useEffect(() => {
    if (file) {
      setDisplayFile(file);
    }
  }, [file]);

  const readFile = (fileReading?: File): Promise<string> => {
    return new Promise(resolve => {
      if (!fileReading) return;

      const reader = new FileReader();
      reader.readAsDataURL(fileReading);
      reader.addEventListener(
        "loadend",
        () => {
          setProgress(0);
          resolve(reader.result as string);
        },
        false,
      );
      reader.addEventListener("progress", e => {
        const progressing = Math.floor((100 * e.loaded) / e.total);
        setProgress(progressing);
      });
    });
  };

  const loadFile = async (fileUpload: File) => {
    await readFile(fileUpload);
    setDisplayFile(fileUpload.name);
    onChange?.(fileUpload, fileUpload.name);
  };

  const handleUploadAddNewFile = (files: File[]) => {
    const fileUpload = files[0];
    setFileSelected(fileUpload);

    if (fileUpload.size > FILE_SIZE) {
      setIsError(true);
      setErrorMaxSize(true);
    } else {
      isError && setIsError(false);
      errorMaxSize && setErrorMaxSize(false);
      loadFile(fileUpload);
    }
  };

  const handleValidate = (isValid: boolean) => {
    if (isValid) {
      isError && setIsError(false);
    } else {
      displayFile && setDisplayFile("");
      !isError && setIsError(true);
    }
  };

  const requiredValidator = required ? ["required"] : [];
  const validators = [
    ...requiredValidator,
    `maxFileSize:${600 * 1024 * 1024}`,
    "allowedExtensions:application/zip,application/vnd.rar,application/x-7z-compressed",
  ];

  const requiredMessage = required ? [errorMessage] : [];
  const errorMessages = [
    ...requiredMessage,
    "Dung lượng file phải nhỏ hơn 600MB.",
    "Định dạng tài liệu không đúng",
  ];

  return (
    <>
      <div className={`w-full ${className} `}>
        <p className="block mb-0.5 text-lg font-medium leading-none">
          {label}
          <span className="text-error">{required && "*"}</span>
        </p>
        <ImageUploadLayout onUpload={handleUploadAddNewFile} accept={accept}>
          <div className="input-display bg-white p-1.5 w-full text-center">
            {displayFile ? (
              <p className="max-h-10 font-medium leading-none">{displayFile}</p>
            ) : (
              <>
                <div className="icon">
                  <GlobalIcon.UploadFile className="block m-auto h-3 w-auto object-cover" />
                </div>
                <p className="mt-0.5 text-sm font-semibold info text-body text-gray">
                  Chọn file tài liệu (.zip)
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
          value={fileSelected || file || ""}
          name={id}
          validators={fileSelected ? validators : requiredValidator}
          errorMessages={fileSelected ? errorMessages : requiredMessage}
          className={classes.inputFieldHidden}
          validatorListener={handleValidate}
          FormHelperTextProps={{ component: ErrorMessage }}
        />
      )}
    </>
  );
};

export default SingleFileUploader;
