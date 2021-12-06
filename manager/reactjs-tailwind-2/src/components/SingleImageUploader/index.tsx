import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import ImageCropper from "components/ImageCropper";
import { IBase64File } from "common/typings";
import { randomId, readFile } from "common/functions";
import ImageUploadLayout from "layouts/ImageUploadLayout";
import { TextValidator } from "react-material-ui-form-validator";
import { useFormStyles } from "common/styles/muiStyles/useStyles";
import { GlobalIcon } from "designs/icons/GlobalIcon";
import ErrorMessage from "components/ErrorMessage";

interface ISingleImageUploaderProps {
  className?: string;
  image?: string;
  label?: string;
  imageCrop?: boolean;
  previewMode?: boolean;
  required?: boolean;
  errorMessage?: string;
  onChange?: (file: File, base64Image: IBase64File) => void;
  text?: string;
  /**
   * @example aspect={16/9}
   */
  aspect?: number;
}

const SingleImageUploader: React.FC<ISingleImageUploaderProps> = props => {
  const {
    image,
    label = "",
    text = "Kéo thả ảnh vào đây",
    aspect = 1,
    required = false,
    errorMessage = "",
    onChange,
    className = "",
    previewMode = true,
    imageCrop = false,
  } = props;

  const [isError, setIsError] = useState(false);
  const [fileSelected, setFileSelected] = useState<File | undefined>();
  const [displayImage, setDisplayImage] = useState<IBase64File | string>("");
  const [croppedFile, setCroppedFile] = useState<File | null>(null);
  const [openCropImage, setOpenCropImage] = useState(false);
  const [id, setId] = useState(randomId());
  const classes = useFormStyles({});

  useEffect(() => {
    if (!croppedFile) {
      const imageUrl: string = image as string;
      setDisplayImage(imageUrl);
    }
  }, [image]);

  const loadImage = async (file: File) => {
    const base64File = await readFile(file);
    setDisplayImage(base64File);
    onChange?.(file, base64File);
  };

  const handleUploadRawImage = (files: File[]) => {
    if (!files) return;
    const file = files[0];
    setFileSelected(file);
    if (imageCrop) {
      setOpenCropImage(true);
    } else {
      loadImage(file);
    }
  };

  const handleCloseImageCropper = () => {
    setOpenCropImage(false);
  };

  const handleCroppedImage = (file: File, base64File: string) => {
    setDisplayImage(base64File);
    setCroppedFile(file);
    onChange && onChange(file, base64File);
    setOpenCropImage(false);
  };

  const handleValidate = (isValid: boolean) => {
    if (isValid) {
      isError && setIsError(false);
    } else {
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
        <p className="mb-0.5 text-lg font-medium">
          {label} {required && <span className="text-error">*</span>}
        </p>
        <ImageUploadLayout onUpload={handleUploadRawImage}>
          <div
            className={`
            input-display rounded-md p-1.5 w-full text-center
          `}
          >
            {previewMode && displayImage ? (
              <img
                src={displayImage}
                className="block object-cover h-full max-h-10 max-w-full m-auto"
                alt="img-display"
              />
            ) : (
              <div className="text-center default-display">
                <div className="icon">
                  <GlobalIcon.UploadImage className="block m-auto h-3 w-auto object-cover" />
                </div>
                <p className="mt-1 text-sm font-semibold info text-body text-grey">
                  {text}
                </p>
              </div>
            )}
          </div>
        </ImageUploadLayout>
        {required && (
          <TextValidator
            value={fileSelected || image || ""}
            name={id}
            validators={fileSelected ? validators : requiredValidator}
            errorMessages={fileSelected ? errorMessages : requiredMessage}
            className={classes.inputFieldHidden}
            validatorListener={handleValidate}
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
