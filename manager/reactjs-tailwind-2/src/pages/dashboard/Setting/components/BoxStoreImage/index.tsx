import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValidatorForm } from "react-material-ui-form-validator";

import SingleImageUploader from "components/SingleImageUploader";

import { IUpdatePlace, IImagesFile, ICustomUploadInput } from "common/typings";
import { uploadImagesInput } from "common/functions/file/uploadImageInput";

import { typeTitle } from "constants/setting";
import { CUSTOM_SIZE_UPLOAD_STORE_IMAGE } from "constants/image";
import { ASPECT_RATIO_3_2 } from "constants/aspect";

import Button from "designs/Button";

import { updateKaraoke } from "redux/actions/place";
import { IRootState } from "redux/reducers";
import { resetAction } from "redux/actions/common";

import { updatePlaceApi } from "pages/dashboard/Setting/helper";

import Preview from "./components/Preview";

interface IBoxStoreImage {}
const BoxStoreImage: React.FC<IBoxStoreImage> = props => {
  const { place } = useSelector((state: IRootState) => state.place);

  const [imagesList, setImagesList] = useState<IImagesFile[]>([]);
  const dispatch = useDispatch();
  const { actionSuccess } = useSelector((state: IRootState) => state.common);

  useEffect(() => {
    if (actionSuccess) {
      dispatch(resetAction());
    }
  }, [actionSuccess]);

  useEffect(() => {
    if (place && place?.images) {
      setImagesList(place.images);
    }
  }, [place]);

  const handleOnSubmit = () => {
    if (imagesList.length <= 0) return;
    const imageFiles = uploadImagesInput(imagesList);
    const payload: IUpdatePlace = {
      id: place?._id || "",
      placeUpdateInput: {
        images: imageFiles as ICustomUploadInput[],
        customSizeForUploadImage: CUSTOM_SIZE_UPLOAD_STORE_IMAGE,
      },
    };
    updatePlaceApi(payload, place?.type);
  };

  const handleImageFile = (image: File, url: string) => {
    if (image && url) {
      const images = { file: image as File, base64File: url };
      setImagesList(state => [...state, images]);
    }
  };
  const handleDeleteImage = (index: number) => {
    if (imagesList) {
      const newImageList = [...imagesList];
      newImageList?.splice(index, 1);
      setImagesList(newImageList);
    }
  };
  return (
    <div>
      <ValidatorForm onSubmit={handleOnSubmit} className=" ">
        <SingleImageUploader
          previewMode={false}
          label={typeTitle("placeImage")}
          aspect={ASPECT_RATIO_3_2}
          onChange={handleImageFile}
          image=""
        />
        <Preview listPreviews={imagesList} onDelete={handleDeleteImage} />
        <div className="mt-4 flex justify-end">
          <Button
            primary
            type="submit"
            className="w-17 max-w-full "
            innerClassName="h-4.5 text-lg normal-case"
          >
            Lưu
          </Button>
        </div>
      </ValidatorForm>
    </div>
  );
};
export default BoxStoreImage;
