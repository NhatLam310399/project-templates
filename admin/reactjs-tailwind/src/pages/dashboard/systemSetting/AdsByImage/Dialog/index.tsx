import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IAds, IAdsInput, ICategory, IRootState } from "common/typings";

import { ADS_BY_IMAGE_LOCATION } from "constants/types";
import { CUSTOM_SIZE_UPLOAD_ADS_IMAGE } from "constants/image";

import SingleImageUploader from "components/SingleImageUploader";
import Dialog, { DialogTitle } from "components/Dialog";

import Input from "designs/Input";
import Select from "designs/Select";

import { createAds, updateAds } from "redux/actions/ads";
import { getAllCategories } from "redux/actions/categories";

interface IAdsByImageDialogProps {
  ButtonMenu: React.ReactElement;
  isEdit?: boolean;
  editField?: IAds | null;
}

const AdsByImageDialog: React.FC<IAdsByImageDialogProps> = props => {
  const { ButtonMenu, isEdit, editField } = props;

  const dispatch = useDispatch();
  const {
    categories: { result: listAdsPositions = [] },
  } = useSelector((state: IRootState) => state.categories);

  const field = useRef<IAds>({ ...editField } || {});

  const [imageFile, setImageFile] = useState<File | null>();
  const [adsLocationSelected, setAdsLocationSelected] =
    useState<ICategory | null>(editField?.displayLocation || null);

  useEffect(() => {
    dispatch(
      getAllCategories({
        filterCategory: {
          code: ADS_BY_IMAGE_LOCATION,
        },
      }),
    );
  }, []);

  const handleSubmit = () => {
    const payload: IAdsInput = {
      name: field.current.name,
      displayLocation: adsLocationSelected?._id,
      link: field.current.link,
    };
    if (imageFile) {
      payload.urlImage = imageFile;
      payload.customSizeForUploadImage = CUSTOM_SIZE_UPLOAD_ADS_IMAGE;
    }

    if (isEdit) {
      dispatch(
        updateAds({
          id: editField?._id || null,
          fieldsToUpdate: payload,
        }),
      );
    } else {
      dispatch(
        createAds({
          createAdsInput: payload,
        }),
      );
    }
  };

  const handleClose = () => {
    if (isEdit) return null;
    field.current = {};
    setImageFile(null);
    setAdsLocationSelected(null);
    return 0;
  };

  return (
    <Dialog
      ButtonMenu={ButtonMenu}
      onConfirm={handleSubmit}
      onClose={handleClose}
    >
      <div className="w-full m-auto rounded-md">
        <DialogTitle className="mb-4">
          <h1 className="font-bold text-black normal-case text-mxl">
            {isEdit ? "Ch???nh s???a qu???ng c??o" : "Th??m qu???ng c??o"}
          </h1>
        </DialogTitle>
        <div>
          <div className="flex flex-col items-center w-full">
            <SingleImageUploader
              image={editField?.urlImage?.small || ""}
              className="mt-1"
              onChange={file => setImageFile(file)}
              aspect={16 / 9}
              required
              errorMessage="Vui l??ng ch???n h??nh ???nh"
              label="H??nh ???nh"
              subTitle="( T???p tin v???i ph???n m??? r???ng .jpg .jpeg .png .gif v?? k??ch th?????c < 1MB)"
            />
          </div>
        </div>
        <Input
          label="T??n lo???i qu???ng c??o"
          name="name"
          placeholder="Nh????p t??n loa??i qu???ng ca??o"
          initValue={editField?.name}
          className="mt-4"
          onChange={value => {
            field.current.name = value;
          }}
          validates={{
            required: {
              errorMessage: "Vui l??ng nh???p t??n qu???ng c??o",
            },
          }}
        />

        <Select
          floatTitle={false}
          label="V??? tr?? qu???ng c??o"
          value={adsLocationSelected?.name}
          options={listAdsPositions}
          className="mt-3"
          required
          errorMessage="Vui l??ng ch???n v??? tr?? qu???ng c??o"
          onSelectOption={option => setAdsLocationSelected(option)}
          placeholder="Cho??n vi?? tri?? qua??ng ca??o"
        />

        <Input
          label="???????ng d???n"
          name="url"
          placeholder="Nh???p ???????ng d???n"
          initValue={editField?.link}
          className="mt-2"
          onChange={value => {
            field.current.link = value;
          }}
          validates={{
            required: {
              errorMessage: "Vui l??ng nh???p t??n ???????ng d???n",
            },
            matchRegexp: {
              errorMessage: "Nh???p ????ng ?????nh d???ng ???????ng d???n VD: /abc-xyz",
              regexp: "^\\/([a-zA-Z_0-9-]+)*$",
            },
          }}
        />
      </div>
    </Dialog>
  );
};

export default AdsByImageDialog;
