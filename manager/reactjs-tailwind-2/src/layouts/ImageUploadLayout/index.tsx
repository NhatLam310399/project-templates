import React, { useCallback, useState } from "react";
import { randomId } from "common/functions";
import { getFilesFromFileList } from "common/functions/file";
import { useDropzone } from "react-dropzone";
import ButtonWrapper from "designs/ButtonWrapper";

interface IImageUploadLayoutProps {
  className?: string;
  onUpload?: (files: File[]) => void;
  multiple?: boolean;
  disabled?: boolean;
  accept?: string;
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

  const onDrop = useCallback(fileList => {
    if (!fileList?.length) return;
    const files = getFilesFromFileList(fileList);
    onUpload && onUpload(files);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const handleUploadRawImages = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const fileList = event.target.files;
    if (!fileList?.length) return;
    const files = getFilesFromFileList(fileList);
    onUpload && onUpload(files);
  };

  return (
    <label
      className={`w-full flex items-center
      h-13 cursor-pointer rounded-md ${className} ${
        disabled
          ? "opacity-60 pointer-events-none"
          : "border border-line border-dashed"
      }`}
      htmlFor={id}
    >
      <div
        {...getRootProps({ className: "dropzone" })}
        className="relative w-full max-h-full"
      >
        {children}
        <input
          // {...getInputProps()}
          accept={accept}
          className="hidden"
          id={id}
          multiple={multiple}
          type="file"
          onChange={handleUploadRawImages}
          disabled={disabled}
        />
        {isDragActive && (
          <div className=" absolute top-0 left-0 w-full h-full bg-black opacity-40" />
        )}
      </div>
    </label>
  );
};

export default ImageUploadLayout;
