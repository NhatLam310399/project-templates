/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect } from "react";
import ImageUploadLayout from "layouts/ImageUploadLayout";
import SVG from "designs/SVG";
import { randomId } from "common/functions";

import { TextValidator } from "react-material-ui-form-validator";
import ErrorMessage from "components/ErrorMessage";
import LinearProgressWithLabel from "components/Progress/LinearProgressWithLabel";

import { useFormStyles } from "common/styles/muiStyles/useStyles";

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

  const [displayFile, setDisplayFile] = useState<string>("");
  const [fileSelected, setFileSelected] = useState<File | undefined>();
  const [errorMaxSize, setErrorMaxSize] = useState(false);
  const [isError, setIsError] = useState(false);
  const [id, setId] = useState(randomId());

  const [progress, setProgress] = useState(0);

  const classes = useFormStyles({});

  useEffect(() => {
    if (file) {
      setDisplayFile(file);
    }
  }, [file]);

  const readProjectFile = (readFile?: File): Promise<string> => {
    return new Promise(resolve => {
      if (!readFile) return;

      const reader = new FileReader();
      reader.readAsDataURL(readFile);
      reader.addEventListener(
        "loadend",
        () => {
          setProgress(0);
          resolve(reader.result as string);
        },
        false,
      );
      reader.addEventListener("progress", e => {
        const progressFile = Math.floor((100 * e.loaded) / e.total);
        setProgress(progressFile);
      });
    });
  };

  const loadFile = async (fileUpload: File) => {
    await readProjectFile(fileUpload);
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
      // fileSelected && setFileSelected(undefined);
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
          <div className="input-display rounded-md bg-white p-1.5 w-full text-center">
            {displayFile ? (
              <p className="font-medium leading-none">{displayFile}</p>
            ) : (
              <>
                <div className="icon">
                  <SVG
                    name="common/upload-file"
                    className="block m-auto max-h-3 w-auto object-cover"
                  />
                </div>
                <p className="mt-0.5 text-sm font-semibold info text-body text-gray">
                  Chọn file tài liệu (.zip)
                </p>
              </>
            )}
          </div>
        </ImageUploadLayout>
        {progress > 0 && <LinearProgressWithLabel value={progress} />}
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
