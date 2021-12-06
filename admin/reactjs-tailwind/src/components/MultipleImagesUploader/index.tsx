import React, { useState, useEffect } from "react";
import { TextValidator } from "react-material-ui-form-validator";
import { FormHelperText } from "@material-ui/core";

import {
  IBase64File,
  ICustomSizeImages,
  IImagesFile,
  ICustomUploadInput,
  IFileUpload,
} from "common/typings";
import { randomId, readFile, uploadImagesInput } from "common/functions";
import { useFormStyles } from "common/styles/muiStyles/useStyles";

import ImageCropper from "components/ImageCropper";
import IconButton from "designs/IconButton";
import SVG from "designs/SVG";
import ImageUploadLayout from "layouts/ImageUploadLayout";
import ErrorMessage from "components/ErrorMessage";

interface IMultiImageUploaderProps {
  className?: string;
  title?: string;
  images?: ICustomSizeImages[];
  imageCrop?: boolean;
  required?: boolean;
  onCreateChange?: (files: File[]) => void;
  onUpdateChange?: (files: ICustomUploadInput[]) => void;
  isEdit?: boolean;
  previewMode?: boolean;
  /**
   * @example aspect={16/9}
   */
  aspect?: number;
  maxNumberImage?: number;
  errorMessage?: string;
}

const MultipleImagesUploader: React.FC<IMultiImageUploaderProps> = props => {
  const {
    images = [],
    required = false,
    title = "",
    aspect = 1,
    className = "",
    previewMode = true,
    imageCrop = true,
    onCreateChange,
    onUpdateChange,
    isEdit,
    maxNumberImage = 999,
    errorMessage,
  } = props;

  const classes = useFormStyles({});

  const [fileSelected, setFileSelected] = useState<File[]>([]);
  const [displayImages, setDisplayImages] = useState<IBase64File[] | string[]>(
    [],
  );
  const validators = required ? ["required"] : [];
  const [listImages, setListImages] = useState<IImagesFile[]>([]);
  // const [croppedFile, setCroppedFile] = useState<File | null>(null);
  const [openCropImage, setOpenCropImage] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [id, setId] = useState(randomId());

  useEffect(() => {
    if (images?.length) {
      const imageUrls = images.map(
        image => image?.small || image?.default || "",
      );
      setDisplayImages(imageUrls);
      setListImages(images);
    }
  }, [images]);

  useEffect(() => {
    if (listImages?.length <= maxNumberImage) {
      errorText && setErrorText("");
    }

    if (isEdit) {
      const uploadImages = uploadImagesInput(listImages);
      onUpdateChange?.(uploadImages);
    } else {
      const createImages = listImages.map(image => {
        const { file } = image as IFileUpload;
        return file!;
      });
      onCreateChange?.(createImages);
    }
  }, [listImages]);

  useEffect(() => {
    // handle upload multiple images
    if (fileSelected?.length) {
      if (imageCrop) {
        setOpenCropImage(true);
      } else {
        loadImage(fileSelected);
      }
    }
  }, [fileSelected]);

  const handleCloseImageCropper = () => {
    setOpenCropImage(false);
  };
  const handleCroppedImage = (file: File, base64File: string) => {
    setOpenCropImage(false);
    setDisplayImages([...displayImages, base64File]);

    const newFileImage = { file, base64File };
    setListImages(state => [...state, newFileImage]);

    // crop multiple images
    const newFileSelected = fileSelected && [...fileSelected];
    newFileSelected?.shift();
    setFileSelected(newFileSelected);
  };

  const loadImage = async (files: File[]) => {
    const imageSrc = await readFile(files[0]);

    setDisplayImages([...displayImages, imageSrc]);

    const newFileImage = { file: files[0], base64File: imageSrc };
    setListImages(state => [...state, newFileImage]);

    // load multiple images
    const newFileSelected = fileSelected && [...fileSelected];
    newFileSelected?.shift();
    setFileSelected(newFileSelected);
  };

  const handleUploadAddNewFile = (files: File[]) => {
    if (listImages.length + files.length <= maxNumberImage) {
      setFileSelected(files);
    } else {
      setErrorText(`Không được tải quá ${maxNumberImage} ảnh.`);
    }
  };
  const handleDeleteImage = (index: number) => {
    const newImageList = [...listImages];
    newImageList?.splice(index, 1);
    setListImages(newImageList);

    const newDisplayList = [...displayImages];
    newDisplayList?.splice(index, 1);
    setDisplayImages(newDisplayList);
  };
  const handleValidate = (isValid: boolean) => {
    if (isValid) {
      isError && setIsError(false);
    } else {
      !isError && setIsError(true);
    }
  };

  const AddImagesUploadButton: React.FC = () => (
    <ImageUploadLayout
      onUpload={handleUploadAddNewFile}
      disabled={displayImages.length >= maxNumberImage}
      multiple
    >
      <div className="input-display rounded-md bg-white text-center p-1.5 w-full">
        {displayImages.length >= maxNumberImage ? (
          <p className="mt-0.5 text-sm font-semibold info text-body text-gray">
            Đã đạt số lượng tối đa
          </p>
        ) : (
          <>
            <div className="icon">
              <SVG
                name="common/upload-image"
                className="block m-auto max-h-3 w-auto object-cover"
              />
            </div>
            <p className="mt-0.5 text-sm font-semibold info text-body text-gray">
              Kéo thả ảnh vào đây
            </p>
          </>
        )}
      </div>
    </ImageUploadLayout>
  );
  const RenderPreviewImages: React.FC = () => {
    if (!displayImages?.length) return null;

    return (
      <div className="w-full">
        <div className="flex flex-nowrap gap-2 overflow-x-auto pt-1">
          {displayImages.map((image: string, index: number) => (
            <div key={String(index)} className="relative IMAGE-WRAPPER">
              <img
                className="w-8 h-10 object-cover block rounded"
                src={image}
                alt="preview"
              />
              <IconButton
                svgName="common/delete-image"
                title="Xoá"
                className="absolute fill-current w-2 h-2 text-primary -top-0.5 -right-0.5 cursor-pointer z-10"
                onClick={() => handleDeleteImage(index)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className={`w-full ${className} `}>
        {title && (
          <div className="block mb-0.5 text-lg font-medium leading-none">
            {title}
            {required && <span className="text-error">*</span>}
          </div>
        )}
        <AddImagesUploadButton />
        {previewMode ? <RenderPreviewImages /> : null}
      </div>

      <TextValidator
        value={displayImages ? id : ""}
        name={id}
        validators={validators}
        errorMessages={[errorMessage]}
        className={classes.inputFieldHidden}
        helperText={errorText}
        validatorListener={handleValidate}
        FormHelperTextProps={{ component: ErrorMessage }}
      />
      {imageCrop && (
        <ImageCropper
          aspect={aspect}
          image={fileSelected?.[0]}
          isOpen={openCropImage}
          onClose={handleCloseImageCropper}
          onConfirm={handleCroppedImage}
        />
      )}
    </div>
  );
};

export default MultipleImagesUploader;
