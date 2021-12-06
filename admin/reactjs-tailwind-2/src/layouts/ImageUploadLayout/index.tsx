import React, { useState } from "react";
import { randomId } from "common/functions";
import { getFilesFromFileList } from "common/functions/file";

import ButtonWrapper from "designs/ButtonWrapper";

interface IImageUploadLayoutProps {
    className?: string;
    onUpload?: (files: File[]) => void;
    multiple?: boolean;
    accept?: string;
    disabled?: boolean;
}

const ImageUploadLayout: React.FC<IImageUploadLayoutProps> = props => {
    const {
        className = "",
        children,
        onUpload,
        multiple = false,
        disabled = false,
        accept = "image/*",
    } = props;
    const [id, setId] = useState(randomId());

    const handleUploadRawImages = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const fileList = event.target.files;
        if (!fileList?.length) return;
        const files = getFilesFromFileList(fileList);
        onUpload && onUpload(files);
    };

    return (
        <label className={`cursor-pointer w-full ${className}`} htmlFor={id}>
            {children}
            <input
                accept={accept}
                className="absolute opacity-0 -z-1"
                id={id}
                multiple
                disabled={disabled}
                type="file"
                onChange={handleUploadRawImages}
            />
        </label>
    );
};

export default ImageUploadLayout;
