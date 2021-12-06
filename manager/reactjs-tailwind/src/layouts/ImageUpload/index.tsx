import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ImageUploadLayoutContainer, Overlay, Label } from "./styles";
import { randomId, getFilesFromFileList } from "common/functions";

interface IImageUploadLayoutProps {
  className?: string;
  onUpload?: (files: File[]) => void;
  disabled?: boolean;
}

const ImageUploadLayout: React.FC<IImageUploadLayoutProps> = props => {
  const { className = "", children, onUpload, disabled = false } = props;
  const [id] = useState(randomId());

  const onDrop = useCallback(fileList => {
    if (!fileList?.length) return;
    const files = getFilesFromFileList(fileList);
    onUpload && onUpload(files);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <ImageUploadLayoutContainer disabled={disabled} className={className}>
      <Label htmlFor={id} className={className}>
        <div {...getRootProps({ className: "dropzone" })} className="relative">
          {children}
          <input {...getInputProps()} />
          {isDragActive && <Overlay />}
        </div>
      </Label>
    </ImageUploadLayoutContainer>
  );
};

export default ImageUploadLayout;
