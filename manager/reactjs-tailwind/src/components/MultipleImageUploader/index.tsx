import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { useField, useFormikContext } from "formik";
import {
  MultipleImageUploaderContainer,
  HiddenInput,
  ImageUploadContainer,
  PreviewImagesContainer,
  Image,
  SkeletonContainer,
  SkeletonMessage,
  ImageContainer,
} from "./styles";
import ImageCropper from "components/ImageCropper";
import { IBase64Image } from "typings";
import ImageUploadLayout from "layouts/ImageUpload";
import SVG from "designs/SVG";
import FormControlLabel from "common/styles/FormControlLabel";
import FormControlErrorHelper from "common/styles/FormControlErrorHelper";

interface IMultipleImageUploaderProps {
  className?: string;
  name: string;
  images: File[] | string[] | undefined | null;
  label: string;
  required?: boolean;
  onChange?: (files: File[], base64Images: IBase64Image[]) => void;
  text?: string;
  /**
   * @example aspect={16/9}
   */
  aspect?: number;
}

const MultipleImageUploader: React.FC<IMultipleImageUploaderProps> = props => {
  const {
    images = [],
    name = "",
    label = "",
    text = "Drag your image here",
    aspect = 1,
    required = false,
    onChange,
    className = "",
  } = props;
  const [fileSelected, setFileSelected] = useState<File | undefined>();
  const [displayImages, setDisplayImages] = useState<IBase64Image[] | string[]>(
    [],
  );
  const [files, setFiles] = useState<File[]>([]);
  const [croppedFile, setCroppedFile] = useState<File | null>(null);
  const [openCropImage, setOpenCropImage] = useState(false);

  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const isError = Boolean(!!meta.error && !!meta.touched);

  useEffect(() => {
    if (!croppedFile) {
      setDisplayImages(images as string[]);
    }
  }, [images]);

  const handleUploadRawImage = (files: File[]) => {
    if (!files) return;

    const file = files[0];
    setFileSelected(file);
    setOpenCropImage(true);
  };

  const handleCloseImageCropper = () => {
    setOpenCropImage(false);
  };

  const handleCroppedImage = (file: File, base64File: string) => {
    const newDisplayImages = [...displayImages, base64File];
    const newFiles = [...files, file];
    setDisplayImages(newDisplayImages);
    setFiles(newFiles);
    setCroppedFile(file);
    setOpenCropImage(false);

    onChange && onChange(newFiles, newDisplayImages);
    setFieldValue(name, newDisplayImages?.length);
  };

  const removeImage = (index: number) => {
    const newDisplayImages = displayImages.filter((_, i) => i !== index);
    const newFiles = files.filter((_, i) => i !== index);
    setDisplayImages(newDisplayImages);
    setFiles(newFiles);

    onChange && onChange(newFiles, newDisplayImages);
    setFieldValue(name, newDisplayImages?.length);
  };

  return (
    <>
      <MultipleImageUploaderContainer className={className}>
        <FormControlLabel isError={isError} required={required}>
          {label}
        </FormControlLabel>
        <ImageUploadLayout onUpload={handleUploadRawImage}>
          <ImageUploadContainer isError={isError}>
            <SkeletonContainer>
              <SVG
                name="common/upload"
                className="block m-auto"
                width="61"
                height="60"
              />
              <SkeletonMessage>{text}</SkeletonMessage>
            </SkeletonContainer>
          </ImageUploadContainer>
        </ImageUploadLayout>
        {isError && (
          <FormControlErrorHelper>{meta?.error}</FormControlErrorHelper>
        )}
        <PreviewImagesContainer>
          {displayImages?.map((image, index) => (
            <ImageContainer key={index}>
              <Image
                src={image || ""}
                alt="Image uploader"
                width="auto"
                height="200"
              />
              <SVG
                className="absolute top-0.5 right-0.5 cursor-pointer"
                name="common/remove-image"
                width="24"
                height="24"
                onClick={() => removeImage(index)}
              />
            </ImageContainer>
          ))}
        </PreviewImagesContainer>
        <HiddenInput {...field} />
      </MultipleImageUploaderContainer>

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

export default MultipleImageUploader;
