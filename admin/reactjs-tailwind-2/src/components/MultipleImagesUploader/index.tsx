import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import ImageCropper from "components/ImageCropper";
import { IBase64Image } from "common/formatTypes";
import { AddImage } from "designs/Icons/index";
import { t } from "language";
import { filterTextFromHtmlString, randomId, readFile } from "common/functions";
import ImageUploadLayout from "layouts/ImageUploadLayout";
import IconButton from "designs/IconButton";
import { FormHelperText } from "@material-ui/core";
import { TextValidator } from "react-material-ui-form-validator";
import { useStyles } from "./styles";
import SVG from "designs/SVG";
export type IImage = File | string | undefined | null;

interface ISingleImageUploaderProps {
    className?: string;
    images: IImage[];
    onChange?: (images: any[]) => void;
    /**
     * @example aspect={16/9}
     */
    aspect?: number;
    imageCrop?: boolean;
    required?: boolean;
    errorMessage?: string;
    maxNumberImage?: number;
}

type IMode = "ADD_IMAGE" | "CHANGE_IMAGE" | "REMOVE_IMAGE" | "";

const MultipleImagesUploader: React.FC<ISingleImageUploaderProps> = props => {
    const {
        images = [],
        aspect = 1,
        onChange,
        className = "",
        imageCrop = true,
        maxNumberImage = 999,
        required = false,
        errorMessage,
    } = props;

    const classes = useStyles();
    const validators = required ? ["required"] : [];
    const [fileSelected, setFileSelected] = useState<File | undefined>();
    const [displayImages, setDisplayImages] = useState<
        IBase64Image[] | string[]
    >([]);
    const [croppedFile, setCroppedFile] = useState<File | null>(null);
    const [openCropImage, setOpenCropImage] = useState(false);
    const [id, setId] = useState(randomId());
    const [mode, setMode] = useState<IMode>("");
    const [listImages, setListImages] = useState<IImage[]>([]);
    const [isError, setIsError] = useState(false);
    const [errorText, setErrorText] = useState("");

    useEffect(() => {
        if (images) {
            setDisplayImages(images as string[]);
            setListImages(images);
        }
    }, [images]);

    useEffect(() => {
        if (listImages?.length <= maxNumberImage) {
            errorText && setErrorText("");
        }
    }, [listImages]);

    const handleCloseImageCropper = () => {
        setOpenCropImage(false);
    };

    const handleCroppedImage = (file: File, base64File: string) => {
        if (mode === "ADD_IMAGE") {
            setDisplayImages([...displayImages, base64File]);
            onChange && onChange([...images, file]);
            setCroppedFile(file);
        } else if (mode === "CHANGE_IMAGE") {
        }
        setOpenCropImage(false);
    };
    const loadImage = async (file: File) => {
        const imageSrc = await readFile(file);
        setDisplayImages([...displayImages, imageSrc as string]);
        const listFile = [...listImages, file];
        setListImages(listFile);
        onChange && onChange(listFile);
    };
    const handleUploadAddNewFile = (files: File[]) => {
        const file = files[0];
        setMode("ADD_IMAGE");
        setFileSelected(file);

        if (listImages.length >= maxNumberImage) {
            setErrorText(
                `${t("common.validate-max-images")}! (${maxNumberImage} ${t(
                    "common.images",
                )})`,
            );
            return;
        }

        if (imageCrop) {
            setOpenCropImage(true);
        } else {
            loadImage(file);
        }
    };
    const handleDeleteImage = (e: any, index: number) => {
        e.preventDefault();
        if (displayImages?.length > 0) {
            const newImageList = [...listImages];
            newImageList?.splice(index, 1);
            setListImages(newImageList);
            onChange && onChange(newImageList);

            const newDisplayList = [...displayImages];
            newDisplayList?.splice(index, 1);
            setDisplayImages(newDisplayList);
        }
    };
    const handleValidate = (isValid: boolean) => {
        if (isValid) {
            isError && setIsError(false);
        } else {
            !isError && setIsError(true);
        }
    };

    const AddImagesUploadButton: React.FC = () => (
        <div className="py-2 text-center rounded default-display">
            <div className="icon">
                <AddImage className="block m-auto" />
            </div>
            <p className="mt-1 text-sm font-normal text-body info phone:text-lg">
                {t("common.upload-image")}
            </p>
        </div>
    );
    interface IImagePreview {
        image: string;
        index: number;
    }
    const ImagePreview: React.FC<IImagePreview> = props => {
        const { image, index } = props;
        return (
            <div
                className={`relative flex items-center justify-center duration-300  hover:opacity-60 w-11 h-11 img-wrapper ${classes.customHoverDelete}`}
            >
                <img
                    src={image}
                    className={`block object-cover w-full h-full`}
                    alt="img-display"
                />
                <div
                    className={`absolute delete top-0 left-0 flex  duration-300 items-center justify-center w-full h-full `}
                >
                    <p
                        onClick={e => handleDeleteImage(e, index)}
                        className="flex items-center justify-center p-0.5 rounded-md text-body bg-lightGray"
                    >
                        <SVG name="common/delete" />
                    </p>
                </div>
            </div>
        );
    };

    return (
        <>
            <div
                className={`w-full h-auto input-display border border-dashed border-body  p-1.5  ${className} `}
            >
                <ImageUploadLayout
                    onUpload={handleUploadAddNewFile}
                    disabled={displayImages.length >= maxNumberImage}
                >
                    <ul
                        className={`flex flex-wrap items-center ${
                            displayImages.length > 4
                                ? "justify-start"
                                : "justify-center"
                        } w-full h-full gap-1 bg-white`}
                    >
                        {displayImages.length > 0 ? (
                            <>
                                {displayImages.map((image, index) => (
                                    <li className="w-11 h-11">
                                        <ImagePreview
                                            image={image}
                                            index={index}
                                        />
                                    </li>
                                ))}
                            </>
                        ) : (
                            <AddImagesUploadButton />
                        )}
                    </ul>
                </ImageUploadLayout>
                {displayImages.length >= maxNumberImage ? (
                    <p className="mt-0.5 text-sm font-semibold text-body text-center leading-none">
                        {t("common.validate-max-images")}
                    </p>
                ) : null}
            </div>
            {isError && (
                <FormHelperText className={classes.formHelperText}>
                    {errorMessage}
                </FormHelperText>
            )}
            {required && (
                <TextValidator
                    value={displayImages ? id : ""}
                    name={id}
                    validators={validators}
                    errorMessages={[errorMessage]}
                    className={classes.inputFieldHidden}
                    validatorListener={handleValidate}
                />
            )}
            {imageCrop && (
                <ImageCropper
                    aspect={aspect}
                    image={fileSelected}
                    isOpen={openCropImage}
                    onClose={handleCloseImageCropper}
                    onConfirm={handleCroppedImage}
                />
            )}
        </>
    );
};

export default MultipleImagesUploader;
