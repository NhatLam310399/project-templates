import React from "react";
import { IFileUpload, IImage, IImagesFile } from "common/typings/App";
import IconButton from "designs/IconButton";

interface IPreviewProps {
  listPreviews: IImagesFile[];
  onDelete: (index: number) => void;
}
const Preview: React.FC<IPreviewProps> = props => {
  const { listPreviews, onDelete } = props;
  const urlImage = listPreviews.map((imageFile: IImagesFile) => {
    if ("base64File" in imageFile) {
      return imageFile?.base64File;
    }
    return imageFile?.small || imageFile?.default;
  });
  const handleDeleteImage = (index: number) => {
    onDelete(index);
  };
  return urlImage?.length > 0 ? (
    <ul className="mt-1.5 grid w-full grid-cols-3 gap-2 laptop:grid-cols-5">
      {urlImage.map((image, index: number) => (
        <div className="relative w-full IMAGE-WRAPPER h-0 pb-full">
          <img
            className="w-full h-full object-cover block absolute inset-0"
            src={image}
            alt="place"
          />
          <IconButton
            svgName="common/delete-image"
            title="Xoá"
            className="absolute z-10 cursor-pointer fill-current text-primary -top-1 -right-1"
            onClick={() => handleDeleteImage(index)}
          />
        </div>
      ))}
    </ul>
  ) : null;
};
export default Preview;
