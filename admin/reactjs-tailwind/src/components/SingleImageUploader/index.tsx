import React, { useState, useEffect } from "react";
import { TextValidator } from "react-material-ui-form-validator";
import ImageCropper from "components/ImageCropper";
import { IBase64File } from "common/typings";
import { randomId } from "common/functions";
import ImageUploadLayout from "layouts/ImageUploadLayout";
import SVG from "designs/SVG";
import ErrorMessage from "components/ErrorMessage";
import { useFormStyles } from "common/styles/muiStyles/useStyles";

interface ISingleImageUploaderProps {
  className?: string;
  image: File | string | undefined | null;
  subTitle?: string;
  onChange?: (file: File) => void;
  required?: boolean;
  errorMessage?: string;
  label?: string;
  /**
   * @example aspect={16/9}
   */
  aspect?: number;
}

const SingleImageUploader: React.FC<ISingleImageUploaderProps> = props => {
  const {
    image,
    aspect = 1,
    onChange,
    className = "",
    required,
    errorMessage = "",
    label = "",
    subTitle = "",
  } = props;

  const [isError, setIsError] = useState(false);
  const [fileSelected, setFileSelected] = useState<File>();
  const [displayImage, setDisplayImage] = useState<IBase64File>("");
  const [croppedFile, setCroppedFile] = useState<File>();
  const [openCropImage, setOpenCropImage] = useState(false);
  const [id, setId] = useState(randomId());

  const classes = useFormStyles({});

  useEffect(() => {
    if (!croppedFile) {
      const imageUrl: string = image as string;
      setDisplayImage(imageUrl);
    }
  }, [image]);

  const handleUploadRawImage = (files: File[]) => {
    if (!files) return;
    const file = files[0];
    displayImage && setDisplayImage("");
    setFileSelected(file);
    if (file?.type.includes("image")) {
      setOpenCropImage(true);
    }
  };

  const handleCloseImageCropper = () => {
    setOpenCropImage(false);
  };

  const handleCroppedImage = (file: File, base64File: string) => {
    setDisplayImage(base64File);
    setCroppedFile(file);
    onChange && onChange(file);
    setOpenCropImage(false);
  };

  const handleValidate = (isValid: boolean) => {
    if (isValid) {
      isError && setIsError(false);
    } else {
      displayImage && setDisplayImage("");
      // fileSelected && setFileSelected(undefined);
      // croppedFile && setCroppedFile(undefined);
      !isError && setIsError(true);
    }
  };

  const accept = "image/jpeg,image/png,image/svg+xml";
  const requiredValidator = required ? ["required"] : [];
  const validators = [
    ...requiredValidator,
    `maxFileSize:${15 * 1024 * 1024}`,
    `allowedExtensions:${accept}`,
  ];
  const requiredMessage = required ? [errorMessage] : [];
  const errorMessages = [
    ...requiredMessage,
    "Dung lượng file phải nhỏ hơn 15MB.",
    "Định dạng ảnh không đúng",
  ];
  return (
    <>
      <div className={`w-full ${className}`}>
        {label && (
          <div className="block mb-0.5 text-lg font-medium leading-none">
            {label}
            {required && <span className="text-error">*</span>}
            {subTitle && (
              <span className="ml-1 text-body text-md">{subTitle}</span>
            )}
          </div>
        )}
        <ImageUploadLayout onUpload={handleUploadRawImage} accept={accept}>
          <div className="input-display rounded-md bg-white text-center p-1.5 w-full">
            {displayImage ? (
              <img
                src={displayImage}
                className="block object-cover h-full max-w-full p-1 m-auto max-h-15"
                alt="img-display"
              />
            ) : (
              <>
                <div className="icon">
                  <SVG
                    name="common/upload-image"
                    className="block object-cover w-auto m-auto max-h-3"
                  />
                </div>
                <p className="mt-0.5 text-sm font-semibold info text-body text-gray">
                  Kéo thả ảnh vào đây
                </p>
              </>
            )}
          </div>
        </ImageUploadLayout>
        {required && (
          <TextValidator
            value={fileSelected || image || ""}
            name={id}
            validatorListener={handleValidate}
            className={classes.inputFieldHidden}
            validators={fileSelected ? validators : requiredValidator}
            errorMessages={fileSelected ? errorMessages : requiredMessage}
            FormHelperTextProps={{ component: ErrorMessage }}
          />
        )}
      </div>
      <ImageCropper
        aspect={aspect}
        image={fileSelected}
        isOpen={openCropImage}
        onClose={handleCloseImageCropper}
        onConfirm={handleCroppedImage}
      />
    </>
  );
};

export default SingleImageUploader;
