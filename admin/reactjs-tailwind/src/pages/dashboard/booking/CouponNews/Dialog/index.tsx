import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { createCouponNews, updateCouponNews } from "redux/actions/coupon";

import {
  ICouponNews,
  ICouponNewsInput,
  ICreateCouponNews,
  IUpdateCouponNews,
} from "common/typings";

import Input from "designs/Input";
import Editor from "designs/Editor";

import Dialog, { DialogTitle } from "components/Dialog";
import SingleImageUploader from "components/SingleImageUploader";

import { ASPECT_RATIO_16_9 } from "constants/aspect";
import { CUSTOM_SIZE_IMAGE_PAGE } from "constants/image";

interface ICouponNewsDialogProps {
  ButtonMenu: React.ReactElement;
  editField?: ICouponNews;
}

const CouponNewsDialog: React.FC<ICouponNewsDialogProps> = props => {
  const { ButtonMenu, editField } = props;
  const dispatch = useDispatch();

  const [imageFile, setImageFile] = useState<File>();
  const [formField, setFormField] = useState<ICouponNewsInput>({});

  const handleName = (name: string) => {
    setFormField(state => ({ ...state, name }));
  };
  const handleDescription = (description: string) => {
    setFormField(state => ({ ...state, description }));
  };
  const handleOnSubmit = () => {
    if (!formField) {
      return;
    }
    let input: ICouponNewsInput = {
      ...formField,
    };
    if (imageFile) {
      input = {
        ...input,
        image: imageFile,
        customImageSizeUpload: CUSTOM_SIZE_IMAGE_PAGE,
      };
    }
    if (editField) {
      const payload: IUpdateCouponNews = {
        id: editField._id!,
        couponNewsUpdateInput: input,
      };
      dispatch(updateCouponNews(payload));
    } else {
      const payload: ICreateCouponNews = {
        couponNewsCreateInput: input,
      };
      dispatch(createCouponNews(payload));
    }
  };
  const handleClose = () => {
    setFormField({});
    setImageFile(undefined);
  };

  const imageSource = editField?.image?.small || editField?.image?.default;
  return (
    <Dialog
      ButtonMenu={ButtonMenu}
      onConfirm={handleOnSubmit}
      onClose={handleClose}
      size="lg"
    >
      <div className="mb-4 text-black normal-case laptop:text-mxl text-xl font-bold">
        {editField ? "Chỉnh sửa tin khuyến mãi" : "Thêm tin khuyến mãi"}
      </div>
      <Input
        className="mb-2"
        label="Tên tin khuyến mãi"
        placeholder="Nhập tên tin khuyến mãi"
        initValue={editField?.name}
        name="name"
        onChange={handleName}
        validates={{
          required: {
            errorMessage: "Vui lòng nhập tên tin khuyến mãi",
          },
        }}
      />
      <div className="w-full">
        <SingleImageUploader
          label="Hình ảnh khuyến mãi"
          image={imageSource}
          onChange={file => {
            setImageFile(file);
          }}
          aspect={ASPECT_RATIO_16_9}
        />
      </div>

      <div className="mt-2">
        <Editor
          label="Nội dung"
          initValue={editField?.description}
          onChange={handleDescription}
          required
          errorMessage="Vui lòng nhập nội dung"
        />
      </div>
    </Dialog>
  );
};

export default CouponNewsDialog;
