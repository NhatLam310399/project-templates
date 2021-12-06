import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import ImageCropper from "components/ImageCropper";
import { IBase64Image } from "common/formatTypes";
// import AvatarSkeleton from "assets/images/avatar.png";

interface IAvatarUploaderProps {
    className?: string;
    image: File | string | undefined | null;
    onChange?: (file: File) => void;
    aspect?: 1;
}

const AvatarUploader: React.FC<IAvatarUploaderProps> = props => {
    const { image, aspect = 1, onChange, className = "" } = props;

    const [fileSelected, setFileSelected] = useState<File | undefined>();
    const [displayImage, setDisplayImage] = useState<IBase64Image | string>("");
    const [croppedFile, setCroppedFile] = useState<File | null>(null);
    const [openCropImage, setOpenCropImage] = useState(false);

    useEffect(() => {
        if (!croppedFile) {
            const imageUrl: string = (image as string) || "";
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
        setOpenCropImage(true);
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
                <label htmlFor="upload-photo">
                    <div className="rounded-full cursor-pointer relative bg-white shadow-sm">
                        <img
                            src={displayImage}
                            className="rounded-full w-10 h-10"
                            alt="avatar"
                        />
                    </div>
                </label>
                <input
                    accept="image/*"
                    className="opacity-0 absolute z-0"
                    id="upload-photo"
                    multiple
                    type="file"
                    onChange={handleUploadRawImage}
                />
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

export default AvatarUploader;
