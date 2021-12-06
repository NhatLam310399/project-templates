import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import ImageCropper from "components/ImageCropper";
import { IBase64Image } from "common/formatTypes";
import { AddImage } from "designs/Icons/index";
import { t } from "language";
import { randomId, readFile } from "common/functions";

interface ISingleImageUploaderProps {
    className?: string;
    image: File | string | undefined | null;
    onChange?: (file: File) => void;
    /**
     * @example aspect={16/9}
     */
    aspect?: number;
    name?: string;
    imageCrop?: boolean;
    objectFit?: "contain" | "horizontal-cover" | "vertical-cover";
}

const SingleImageUploader: React.FC<ISingleImageUploaderProps> = props => {
    const {
        image,
        aspect = 1,
        onChange,
        objectFit,
        className = "",
        name,
        imageCrop = true,
    } = props;

    const [fileSelected, setFileSelected] = useState<File | undefined>();
    const [displayImage, setDisplayImage] = useState<IBase64Image | string>("");
    const [croppedFile, setCroppedFile] = useState<File | null>(null);
    const [openCropImage, setOpenCropImage] = useState(false);
    const [id, setId] = useState(randomId());

    useEffect(() => {
        if (!croppedFile) {
            const imageUrl: string = image as string;
            setDisplayImage(imageUrl);
        }
    }, [image]);

    const handleUploadRawImage = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const files = event?.target?.files;
        if (!files) return;

        const file = files[0];
        setFileSelected(file);
        if (imageCrop) {
            setOpenCropImage(true);
        } else {
            loadImage(file);
        }
    };
    const loadImage = async (file: File) => {
        const imageSrc = await readFile(file);
        setDisplayImage(imageSrc as string);
        onChange && onChange(file);
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

    return (
        <>
            <div className={className}>
                <label htmlFor={id}>
                    <div
                        className={`input-display border-dashed border-body bg-white p-1.5 cursor-pointer ${
                            displayImage ? "border-0" : "border"
                        }`}
                    >
                        {displayImage ? (
                            <img
                                src={displayImage}
                                className={`block object-cover max-w-full m-auto  max-h-15`}
                                alt="img-display"
                            />
                        ) : (
                            <div className="py-2 text-center bg-white rounded default-display">
                                <div className="icon">
                                    <AddImage className="block m-auto" />
                                </div>
                                <p className="mt-1 text-sm font-normal text-body info phone:text-lg">
                                    {t("common.upload-image")}
                                </p>
                            </div>
                        )}
                    </div>
                    <input
                        accept="image/*"
                        className="absolute opacity-0 -z-1"
                        id={id}
                        multiple
                        type="file"
                        onChange={handleUploadRawImage}
                    />
                </label>
            </div>
            <ImageCropper
                aspect={aspect}
                image={fileSelected}
                isOpen={openCropImage}
                onClose={handleCloseImageCropper}
                onConfirm={handleCroppedImage}
                objectFit={objectFit}
            />
        </>
    );
};

export default SingleImageUploader;
